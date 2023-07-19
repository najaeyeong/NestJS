import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(req: Request, Body: any, param: {
        id: string;
        name: string;
    }): string;
    getIndex(req: Request, res: Response): string;
}
