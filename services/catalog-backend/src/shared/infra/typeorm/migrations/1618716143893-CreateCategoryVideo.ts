import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateCategoryVideo1618716143893
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'category_video',
        columns: [
          {
            name: 'category_id',
            type: 'uuid',
          },
          {
            name: 'video_id',
            type: 'uuid',
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('category_video', [
      new TableForeignKey({
        columnNames: ['category_id'],
        referencedTableName: 'categories',
        referencedColumnNames: ['id'],
      }),
      new TableForeignKey({
        columnNames: ['video_id'],
        referencedTableName: 'videos',
        referencedColumnNames: ['id'],
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('category_video');
  }
}
