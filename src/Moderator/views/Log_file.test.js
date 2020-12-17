import React from "react";
import { shallow } from "enzyme";
import Log_file from "./Log_file";

describe("Log file Testing", ()=>{
    let wrapper;
    beforeEach(()=> {
        wrapper = shallow(<Log_file/>);
    });
    test("render buttons", () => {
        //console.log(wrapper.debug());

        
        
    });

});