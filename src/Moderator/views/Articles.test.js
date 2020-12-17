import React from "react";
import { shallow } from "enzyme";
import Articles from "./Articles";

describe("Moderator Articles Testing", ()=>{
    let wrapper;
    beforeEach(()=> {
        wrapper = shallow(<Articles/>);
    });
    test("render buttons", () => {
        //console.log(wrapper.debug());

        
        
    });

    test("render the text of headers", () => {
        const h5=wrapper.find('h5.card-title');
        const result1=h5.text();
        expect(result1).toBe('Articles');

        const h1=wrapper.find('h1');
        const result2=h1.text();
        expect(result2).toBe('Articles');

    });

});