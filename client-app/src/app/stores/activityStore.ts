import { observable } from "mobx";
import { createContext } from "react";

class ActivityStore{
  @observable title= 'Hello From mobX By F@%er';
}

export default createContext(new ActivityStore());