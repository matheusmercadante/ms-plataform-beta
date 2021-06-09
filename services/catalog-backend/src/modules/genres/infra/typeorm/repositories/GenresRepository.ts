import { getRepository, Repository } from 'typeorm';

import ICreateGenreDTO from '@modules/genres/dtos/ICreateGenreDTO';
import IGenresRepository from '@modules/genres/repositories/IGenresRepository';
import Genre from '../entities/Genre';

class GenresRepository implements IGenresRepository {
  private ormRepository: Repository<Genre>;

  constructor() {
    this.ormRepository = getRepository(Genre);
  }

  public async findByName(name: string): Promise<Genre | undefined> {
    const findGenre = await this.ormRepository.findOne({
      where: { name },
    });

    return findGenre || undefined;
  }

  public async create({
    name,
    is_active,
    categories,
  }: ICreateGenreDTO): Promise<Genre> {
    if (categories) {
      const createGenre = this.ormRepository.create({
        name,
        is_active,
        categories,
      });

      await this.ormRepository.save(createGenre);

      return createGenre;
    }

    const createGenre = this.ormRepository.create({
      name,
      is_active,
    });

    await this.ormRepository.save(createGenre);

    return createGenre;
  }
}

export default GenresRepository;
