import { Router } from 'express';
import TemplateController from './template.controller';

class TemplateRoute {

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    routes(){
        // GET
        this.router.get('/:id', TemplateController.GetOne)
        this.router.get('', TemplateController.GetAll)
        this.router.get('*', TemplateController.Default)
        // POST
        this.router.post('', TemplateController.Create)
        // DELETE
        this.router.delete('/:id', TemplateController.DeleteOne)
        // PUT
        this.router.put('/:id', TemplateController.UpdateOne)
    }
}

export default  new TemplateRoute().router;
