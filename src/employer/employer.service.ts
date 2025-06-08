import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { Employer } from './entities/employer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Poste } from 'src/postes/entities/poste.entity';
import { Departement } from 'src/postes/entities/departement.entity';

@Injectable()
export class EmployerService {
  constructor(
    @InjectRepository(Employer)
    private readonly employerRepository: Repository<Employer>,
    @InjectRepository(Poste)
    private readonly posteRepository: Repository<Poste>,
    @InjectRepository(Departement)
    private readonly departementRepository: Repository<Departement>
  ){}

  async generateMatricule (): Promise<string>{
    const lastEmployer = await this.employerRepository.find({ order: {id: 'DESC'}, take: 1})
    let lastNumber = 0;
    if (lastEmployer.length > 0) {
      const lastMatricule = lastEmployer[0].matricule;
      const match = lastMatricule.match(/M-(\d+)/);
      if (match) {
        lastNumber = parseInt(match[1],10);
      }
    }
    const newNumber = lastNumber + 1;
    const newMatricule = `M-${newNumber.toString().padStart(4,'0')}`;
    return newMatricule;
  }

  async create(createEmployerDto: CreateEmployerDto, file: Express.Multer.File) {
    const poste = await this.posteRepository.findOneBy({id : createEmployerDto.posteId});
    if (!poste) {
      throw new NotFoundException('Poste not found');
    }

    const departement = await this.departementRepository.findOneBy({id: createEmployerDto.departementId})
    if (!departement) {
      throw new NotFoundException('Departement not found');
    }

    createEmployerDto.profile_file = file.path;
    const matricule = await this.generateMatricule();
    const employer = this.employerRepository.create({
      ...createEmployerDto,
      matricule,
      poste,
      departement
    });

    const savedEmployer = await this.employerRepository.save(employer)
    if (!savedEmployer) {
      return {
        message: 'nothing to insert',
        status: 400
      }
    }

    return {
      message: "Insertion with successfull",
      status: 201,
      data: savedEmployer
    }
  }

  async findAll() {
    return await this.employerRepository.find({
      where: {licencement: false},
      relations: ['poste','departement']
    });
  }

  async findOne(id: number) {
    const employer = await this.employerRepository.findOne({
      where: {id},relations: ['poste','departement']
    });
    if (!employer) {
      throw new NotFoundException('Employer not found');
    }
    return {
      employer: employer
    };
  }

  async update(id: number, updateEmployerDto: UpdateEmployerDto  , file: Express.Multer.File) {
    const employer = await this.employerRepository.findOne({where: {id}});
    if (!employer) {
      throw new NotFoundException('Employer not found');
    }

    const poste = await this.posteRepository.findOneBy({id : updateEmployerDto.posteId});
    if (!poste) {
      throw new NotFoundException('Poste not found');
    }

    const departement = await this.departementRepository.findOneBy({id: updateEmployerDto.departementId})
    if (!departement) {
      throw new NotFoundException('Departement not found');
    }

    Object.assign(employer, updateEmployerDto)

    if (file) {
      employer.profile_file = file.path
    }

    employer.departement = departement;
    employer.poste = poste;
    
    await this.employerRepository.save(employer);
    return{
      message: "employer updated",
      status: 200,
      data: employer 
    }

  }
}
