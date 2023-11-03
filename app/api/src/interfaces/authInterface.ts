import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export interface AuthRequestInterface extends Request {
  user?: {
    _id?: ObjectId;
    email?: string;
  };
}

export interface DecodedToken extends JwtPayload {
  _id?: ObjectId;
}
