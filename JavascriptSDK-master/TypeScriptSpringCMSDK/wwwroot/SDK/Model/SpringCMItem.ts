export class SpringCMItem<T> {

    public  Items: Array<T> 

    public Href: string 
    
    public Offset: number;

    public  Limit: number; 

    public First: string;

    public Previous: string;
    public Next: string;
    public Last: string;
    public Total: number;
}