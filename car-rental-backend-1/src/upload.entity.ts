import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UploadFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @Column()
  originalName: string;

  @Column()
  filePath: string;

  @Column()
  mimeType: string;

  @Column()
  size: number;

  @CreateDateColumn()
  uploadDate: Date;

  @ManyToOne(() => User, user => user.files)
  user: User;
}