import { IActivity } from './../../app/models/activity';
import agent from '../../app/api/agent';
import * as types from './actionTypes';




export const loadActivitiesSuccess = (activities: IActivity[]) => {
  return { type: types.LOAD_ACTIVITIES_SUCCESS, payload: { activities } };
}

//* Thunk Calls
export const loadActivities = () => {
  return (dispatch: Function) => {
    agent.Activities.list()
      .then(response => {
        let activities: IActivity[] = [];
        response.forEach(activity => {
          activity.date = activity.date.split(".")[0];
          activities.push(activity);
        });
        dispatch(loadActivitiesSuccess(activities));
      })
      .catch(error => {
        throw error;
      });
  }
}