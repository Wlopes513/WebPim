import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface WeatherForecastsState {
    isLoading: boolean;
    employee: any[];
}

export interface DefaultState {
    isLoading: boolean;
    data: any;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

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

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestWeatherForecastsAction | ReceiveWeatherForecastsAction;
type KnownDeleteEmployeeAction = RequestDeleteEmployeeAction | ReceiveDeleteEmployeeAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestWeatherForecasts: (): AppThunkAction<KnownAction> => (dispatch) => {
        // Only load data if it's something we don't already have (and are not already loading)
        fetch(`employee`)
            .then(response => response.json() as any)
            .then(data => {
                dispatch({ type: 'RECEIVE_WEATHER_FORECASTS', employee: data });
            });

        dispatch({ type: 'REQUEST_WEATHER_FORECASTS' });
    },
    requestDeleteEmployee: (id: any): AppThunkAction<KnownDeleteEmployeeAction> => (dispatch) => {
        // Only load data if it's something we don't already have (and are not already loading)
        fetch(`employee/${id}`, {method: "delete"})
            .then(response => response.json() as any)
            .then(data => {
                console.log("data");
                console.log(data);
                dispatch({ type: 'RECEIVE_DELETE_EMPLOYEE', deleted: data });
            });

        dispatch({ type: 'REQUEST_DELETE_EMPLOYEE' });
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

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
            break;
    }

    return state;
};
