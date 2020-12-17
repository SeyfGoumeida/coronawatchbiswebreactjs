import React from "react";
import { shallow } from "enzyme";
import Robots_facebook from "./Robots_facebook";

describe("Robots facebook content Testing", ()=>{
    let wrapper;
    beforeEach(()=> {
        wrapper = shallow(<Robots_facebook/>);
    });
    test("render buttons", () => {
        //console.log(wrapper.debug());

        
        
    });

});