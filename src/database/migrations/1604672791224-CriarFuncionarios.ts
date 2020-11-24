import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CriarFuncionarios1604672791224 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'funcionarios',
          columns:[
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy:'uuid',
              default: 'uuid_generate_v4()'
            },
            {
              name: 'nome',
              type: 'varchar',
            },
            {
              name: 'email',
              type: 'varchar',
            },
            {
              name: 'funcao',
              type: 'varchar',
            },
            {
              name: 'departamento',
              type: 'varchar',
            },
            {
              name: 'telefone',
              type: 'varchar',
            },
            {
              name: 'foto',
              type: 'varchar'
            },
            {
              name: 'like',
              type: 'integer',
              default: 0
            },
            {
              name: 'dislike',
              type: 'integer',
              default: 0
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
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('funcionarios')
    }

}
