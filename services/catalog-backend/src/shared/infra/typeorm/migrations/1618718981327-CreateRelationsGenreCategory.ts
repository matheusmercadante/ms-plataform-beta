import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateCategoryGenre1618718981327
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'genres_categories_categories',
        columns: [
          {
            name: 'categories_id',
            type: 'uuid',
          },
          {
            name: 'genres_id',
            type: 'uuid',
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('genres_categories_categories', [
      new TableForeignKey({
        columnNames: ['categories_id'],
        referencedTableName: 'categories',
        referencedColumnNames: ['id'],
      }),
      new TableForeignKey({
        columnNames: ['genres_id'],
        referencedTableName: 'genres',
        referencedColumnNames: ['id'],
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('genres_categories_categories');
  }
}
