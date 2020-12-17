import React from "react";
import { shallow } from "enzyme";
import Robots_webSites from "./Robots_webSites";

describe("Robots web sites content Testing", ()=>{
    let wrapper;
    beforeEach(()=> {
        wrapper = shallow(<Robots_webSites/>);
    });
    test("render buttons", () => {
        //console.log(wrapper.debug());

        
        
    });

});