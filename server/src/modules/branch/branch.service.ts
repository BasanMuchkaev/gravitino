import { Injectable } from '@nestjs/common';
import { CreateBranchDto, UpdateBranchDto } from './dto';
import { Branch } from './entities/branch.entity';
import { InjectModel } from '@nestjs/sequelize';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { BranchResponse, StatusBranchResponse } from './response';
import { Organization } from '../organization/entities/organization.entity';
@Injectable()
export class BranchService {
  constructor(
    @InjectModel(Branch) private branchRepository: typeof Branch,
    private readonly historyService: TransactionHistoryService,
  ) {}

  async create(
    createBranchDto: CreateBranchDto,
    user_id: number,
  ): Promise<BranchResponse> {
    const newBranch = await this.branchRepository.create({
      ...createBranchDto,
    });

    const historyDto = {
      user_id: user_id,
      comment: `Создан филиал #${newBranch.branch_id}`,
    };
    await this.historyService.create(historyDto);

    return newBranch;
  }

  async findAll(): Promise<BranchResponse[]> {
    try {
      const result = await this.branchRepository.findAll({
        include: [Organization],
        attributes: { exclude: ['organization_id'] },
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(branch_id: number): Promise<boolean> {
    try {
      const foundBranch = await this.branchRepository.findOne({
        where: { branch_id },
      });

      if (foundBranch) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(
    updateBranchDto: UpdateBranchDto,
    user_id: number,
  ): Promise<BranchResponse> {
    try {
      let foundBranch = null;
      await this.branchRepository.update(
        { ...updateBranchDto },
        { where: { branch_id: updateBranchDto.branch_id } },
      );

      foundBranch = await this.branchRepository.findOne({
        where: { branch_id: updateBranchDto.branch_id },
      });

      if (foundBranch) {
        const historyDto = {
          user_id: user_id,
          comment: `Изменен филиал #${foundBranch.branch_id}`,
        };
        await this.historyService.create(historyDto);
      }

      return foundBranch;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(
    branch_id: number,
    user_id: number,
  ): Promise<StatusBranchResponse> {
    const deleteBranch = await this.branchRepository.destroy({
      where: { branch_id },
    });

    if (deleteBranch) {
      const historyDto = {
        user_id: user_id,
        comment: `Удален филиал #${branch_id}`,
      };
      await this.historyService.create(historyDto);

      return { status: true };
    }

    return { status: false };
  }
}
