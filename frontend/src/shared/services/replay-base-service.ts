import { Service } from "./service";
import { Observable, ReplaySubject } from "rxjs";
import { ApiService } from "./api/api.service";

export abstract class ReplayBaseService<T> extends Service<T> {
    protected constructor(
        api: ApiService<any, any>,
        apiMethod: () => Observable<any>,
        responseHandler: (arg0: any) => void,
        items: T[] = []
    ) {
        super(items);
        apiMethod.apply(api).subscribe(
            {
                next: (value) => {
                    responseHandler(value);
                    this.replaySubject.next(undefined);
                }
            }
        );
    }

    public replaySubject: ReplaySubject<any> = new ReplaySubject();
}
