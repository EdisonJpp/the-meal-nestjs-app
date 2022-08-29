import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

// observable with axios
export type IObservableAxios<T = any> = Observable<AxiosResponse<T>>;
