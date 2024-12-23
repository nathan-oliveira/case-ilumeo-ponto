import { OmitType } from '@nestjs/swagger';

import { PointEntity } from 'src/modules/points/entities/points.entity';

export class ReadPointDto extends OmitType(PointEntity, []) {}
