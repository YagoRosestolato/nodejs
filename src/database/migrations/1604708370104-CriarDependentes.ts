import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CriarDependentes1604708370104 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'dependentes',
          columns: [
            {
              name: 'id_do_funcionario',
              type: 'uuid'
            },
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()'
            },
            {
              name: 'nome',
              type: 'varchar',
            },
            {
              name: 'data_nascimento',
              type: 'varchar',
            },
            {
              name: 'grau_de_parentesco',
              type: 'varchar'
            },
            {
              name: 'foto',
              type: 'varchar'
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()'
            }

          ]
        })
      );
      await queryRunner.createForeignKey('dependentes', new TableForeignKey({
        referencedTableName: 'funcionarios',
        referencedColumnNames: ['id'],
        columnNames: ['id_do_funcionario'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('dependentes')
    }

}
