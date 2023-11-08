import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export interface AuthRequestInterface extends Request {
  user_id?: ObjectId;
}

export interface DecodedToken extends JwtPayload {
  _id: ObjectId;
}
