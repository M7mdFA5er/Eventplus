import { IActivity } from './../models/activity';
import { observable, action, computed } from "mobx";
import { createContext } from "react";
import agent from '../api/agent';

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activities: IActivity[] = [];
  @observable selectedActivity: IActivity | undefined;
  @observable loadingInitial = false;
  @observable editMode = false;
  @observable submitting = false;


  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }


  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities = await agent.Activities.list();
      activities.forEach((activity) => {
        activity.date = activity.date.split(".")[0];
        //this.activities.push(activity);
        this.activityRegistry.set(activity.id, activity);
      });
      this.loadingInitial = false;
    } catch (error) {
      console.log('error', error);
      this.loadingInitial = false;
    }
  }

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      //TODO: Change that to Create Guid in Server Side and send back the activity to client
      //* This Method Create Activity At ClientSide including Guid(id)
      //* This May Be a Secuirty/Logical Flaw that this Id may be change or duplicated with another (id)
      await agent.Activities.create(activity);
      this.activityRegistry.set(activity.id, activity);
      this.editMode = false;
      this.submitting = false;
    } catch (error) {
      console.log('error', error);
      this.submitting = false;
    }
  }

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      this.activityRegistry.set(activity.id, activity);
      this.selectedActivity = activity;
      this.editMode = false;
      this.submitting = false;
    } catch (error) {
      console.log('error', error);
      this.submitting = false;
    }
  }



  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedActivity = undefined;
  }

  @action openEditForm = (id : string)  =>{
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = true;
  }

  @action cancelSelectedActivity = () =>{
    this.selectedActivity =  undefined;
  }

  @action cancelFormOpen = () =>{
    this.editMode = false;
  }

  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = false;
  }



}

export default createContext(new ActivityStore());