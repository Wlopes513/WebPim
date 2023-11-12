import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

export interface WeatherForecastsState {
    isLoading: boolean;
    employee: any[];
}

export interface DefaultState {
    isLoading: boolean;
    data: any;
}

interface RequestWeatherForecastsAction {
    type: 'REQUEST_WEATHER_FORECASTS';
}

interface ReceiveWeatherForecastsAction {
    type: 'RECEIVE_WEATHER_FORECASTS';
    employee: any[];
}

interface RequestDeleteEmployeeAction {
    type: 'REQUEST_DELETE_EMPLOYEE';
}

interface ReceiveDeleteEmployeeAction {
    type: 'RECEIVE_DELETE_EMPLOYEE';
    deleted: any;
}

type KnownAction = RequestWeatherForecastsAction | ReceiveWeatherForecastsAction;
type KnownDeleteEmployeeAction = RequestDeleteEmployeeAction | ReceiveDeleteEmployeeAction;

export const actionCreators = {
    requestWeatherForecasts: (): AppThunkAction<KnownAction> => (dispatch) => {
        fetch(`employee`)
            .then(response => response.json() as any)
            .then(data => {
                dispatch({ type: 'RECEIVE_WEATHER_FORECASTS', employee: data });
            });

        dispatch({ type: 'REQUEST_WEATHER_FORECASTS' });
    },
    requestDeleteEmployee: (id: any): AppThunkAction<KnownDeleteEmployeeAction> => (dispatch) => {
        fetch(`employee/${id}`, { method: "delete" })
            .then(response => response.json() as any)
            .then(data => {
                dispatch({ type: 'RECEIVE_DELETE_EMPLOYEE', deleted: data });
            });

        dispatch({ type: 'REQUEST_DELETE_EMPLOYEE' });
    },
    requestDepartament: (): AppThunkAction<any> => (dispatch) => {
        fetch(`departament`)
            .then(response => response.json() as any)
            .then(data => {
                dispatch({ type: 'RECEIVE_DEPARTAMENT', departament: data });
            });

        dispatch({ type: 'REQUEST_DEPARTAMENT' });
    },
    postEmployee: (body: any): AppThunkAction<any> => (dispatch) => {
        fetch(`employee`, { method: "POST", body: JSON.stringify(body), headers: {
            "Content-Type": "application/json"
        }})
            .then(response => response.json() as any)
            .then(data => {
                dispatch({ type: 'RECEIVE_POST_EMPLOYEE', postEmployee: data });
            });

        dispatch({ type: 'REQUEST_POST_EMPLOYEE' });
    }
};

const unloadedState: WeatherForecastsState = { employee: [], isLoading: false };

export const reducer: Reducer<WeatherForecastsState> = (state: any, incomingAction: Action): any => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as any;
    switch (action.type) {
        case 'REQUEST_WEATHER_FORECASTS':
            return {
                employee: state.employee,
                isLoading: true
            };
        case 'RECEIVE_WEATHER_FORECASTS':
            return {
                employee: action.employee,
                isLoading: false
            };
        case 'REQUEST_DELETE_EMPLOYEE':
            return {
                deleted: state.deleted,
                isLoading: true
            };
        case 'RECEIVE_DELETE_EMPLOYEE':
            return {
                deleted: action.deleted,
                isLoading: false
            };
        case 'REQUEST_DEPARTAMENT':
            return {
                departament: state.departament,
                isLoading: true
            };
        case 'RECEIVE_DEPARTAMENT':
            return {
                departament: action.departament,
                isLoading: false
            };
        case 'REQUEST_POST_EMPLOYEE':
            return {
                postEmployee: action.postEmployee,
                postEmployeeIsLoading: true
            };
        case 'RECEIVE_POST_EMPLOYEE':
            return {
                postEmployee: action.postEmployee,
                postEmployeeIsLoading: false
            };
            break;
    }

    return state;
};
