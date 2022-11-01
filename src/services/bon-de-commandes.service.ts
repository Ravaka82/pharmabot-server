import { DB_PORT } from './../app.constant';
import {BonDeCommande} from "../model";
import {TryCatch} from "../utils/error.handler";
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { createWriteStream } from "fs";
dotenv.config;
const {parse,join} = require("path");
import Path from 'path';
import fs from 'fs';
import {self as UploadService} from './upload.service';

export default {

  async create(payload) {
    return TryCatch(async () => {
        console.log('CREATE BON DE COMMANDE', payload)
        payload.updatedAt = new Date();
        return await BonDeCommande.create(payload)
    }, `Cannot create bon de commande.`)
  },

  async getAll() {
    return TryCatch(async () => await BonDeCommande.find().populate("fournisseur").populate("archive"), `Cannot get all Bon de commande.`)
  },

  async deleteById(id) {
    return TryCatch(async () => await BonDeCommande.findByIdAndDelete(id), `Cannot delete Bon de commande.`)
  },

  async updateById({_id, changes}) {
    return TryCatch(async () => {
        changes.updatedAt = new Date();
        return await BonDeCommande.findByIdAndUpdate(_id, changes);
    }, `Cannot update bon de commande .`)
  },
  async  sender({to, subject, text, file,filename}){   
    console.log('testtttttt>',filename)
    return TryCatch(async () => {
      await UploadService.upload(file?.file, `pdf/`,filename)
      var transporter = nodemailer.createTransport({
        port:587,
        host:"smtp-mail.outlook.com",
        auth: {
          user: "senderPharmabot@outlook.fr",
          pass: "ravaka123456789"
        },
        tls: {
          rejectUnauthorized: false
        }
      });
      var mailOptions = {
          from: "senderPharmabot@outlook.fr",
          to: to, 
          subject: subject,
          text: text,
          attachments:[
            {
              filename:filename+'.pdf',
              path:'upload/pdf/'+filename+'.pdf'
            }
        ]
      };
      await  transporter.sendMail(mailOptions, function(error,info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }, `Cannot Send email .`)
  }
}

