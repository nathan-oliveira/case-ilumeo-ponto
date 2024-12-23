import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { RecordTypeEnum } from 'src/modules/points/enums/record-type.enum';

export class Points1734733695292 implements MigrationInterface {
  private table = new Table({
    name: 'pointRecords',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      },
      {
        name: 'userCode',
        type: 'varchar',
        length: '20',
        isNullable: false,
      },
      {
        name: 'registrationDate',
        type: 'timestamp',
        isNullable: false,
      },
      {
        name: 'recordType',
        type: 'enum',
        enum: Object.values(RecordTypeEnum),
        isNullable: false,
      },
      {
        name: 'orderOfRegistration',
        type: 'int',
        isNullable: false,
      },
      {
        name: 'active',
        type: 'boolean',
        default: true,
        isNullable: false,
      },
      {
        name: 'createdAt',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
      },
      {
        name: 'updatedAt',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
      },
      {
        name: 'removedAt',
        type: 'timestamp',
        isNullable: true,
        default: null,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
