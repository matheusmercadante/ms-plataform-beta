import Genre from '@modules/genres/infra/typeorm/entities/Genre';
import ICreateGenreDTO from '@modules/genres/dtos/ICreateGenreDTO';

interface GenresRepository {
  findByName(name: string): Promise<Genre | undefined>;
  create(data: ICreateGenreDTO): Promise<Genre>;
}

export default GenresRepository;
