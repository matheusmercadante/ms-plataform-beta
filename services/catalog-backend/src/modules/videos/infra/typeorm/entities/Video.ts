import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';

import uploadConfig from '@config/upload';

import Category from '@modules/categories/infra/typeorm/entities/Category';
import Genre from '@modules/genres/infra/typeorm/entities/Genre';

@Entity('videos')
class Video {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  year_launched: number;

  @Column({ default: false })
  opened: boolean;

  @Column()
  video: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @Expose({ name: 'video_url' })
  getVideoUrl(): string | null {
    if (!this.video) return null;

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.video}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.video}`;
      default:
        return null;
    }
  }

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @ManyToMany(() => Genre)
  @JoinTable()
  genres: Genre[];
}

export default Video;
