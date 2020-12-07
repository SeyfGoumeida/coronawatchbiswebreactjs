import React from "react";
import { shallow } from "enzyme";
import Home from "./Home";

describe("Home Testing", ()=>{
    let wrapper;
    beforeEach(()=> {
        wrapper = shallow(<Home/>);
    });


    test("render the text of span", () => {
        const span1=wrapper.find('#span1');
        const result1=span1.text();
        expect(result1).toBe('Infected');

        const span2=wrapper.find('#span2');
        const result2=span2.text();
        expect(result2).toBe('Recovered');

        const span3=wrapper.find('#span3');
        const result3=span3.text();
        expect(result3).toBe('Deceased');

        const span4=wrapper.find('#span4');
        const result4=span4.text();
        expect(result4).toBe('Currently Sick');

        
        
    });

    test("render the text of headers", () => {
        const h1=wrapper.find('h1');
        const result2=h1.text();
        expect(result2).toBe('Home');
    });


});