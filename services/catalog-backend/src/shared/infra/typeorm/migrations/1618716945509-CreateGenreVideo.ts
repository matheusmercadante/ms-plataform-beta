import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateGenreVideo1618716945509
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'genre_video',
        columns: [
          {
            name: 'genre_id',
            type: 'uuid',
          },
          {
            name: 'video_id',
            type: 'uuid',
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('genre_video', [
      new TableForeignKey({
        columnNames: ['genre_id'],
        referencedTableName: 'genres',
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
    await queryRunner.dropTable('genre_video');
  }
}
