import React from "react";
import { shallow } from "enzyme";
import Historic from "./Historic";

describe("Epedimic history Testing", ()=>{
    let wrapper;
    beforeEach(()=> {
        wrapper = shallow(<Historic/>);
    });
    test("render buttons", () => {
        //console.log(wrapper.debug());

        const btn1=wrapper.find('#search1');
        const result1=btn1.text();
        expect(result1).toBe('Search Regions');

        const btn2=wrapper.find('#view_hist');
        const result2=btn2.text();
        expect(result2).toBe('View Region\'s Historic');
        
    });

    test("render the text of headers", () => {
        const h5=wrapper.find('h5.card-title');
        const result1=h5.text();
        expect(result1).toBe('Regions Epidemic History');

        const h1=wrapper.find('h1');
        const result2=h1.text();
        expect(result2).toBe('Regions Epidemic History');
    });

    test("render the header of table", () => {
        const th1=wrapper.find('#th1');
        const result1=th1.text();
        expect(result1).toBe('DATE');

        const th2=wrapper.find('#th2');
        const result2=th2.text();
        expect(result2).toBe('INFECTED');

        const th3=wrapper.find('#th3');
        const result3=th3.text();
        expect(result3).toBe('RECOVERED');

        const th4=wrapper.find('#th4');
        const result4=th4.text();
        expect(result4).toBe('DECEASED');

        const th5=wrapper.find('#th5');
        const result5=th5.text();
        expect(result5).toBe('CURRENTLY SICK');

        const th6=wrapper.find('#th6');
        const result6=th6.text();
        expect(result6).toBe('INFECTED BUT NOT YET SICK');
    });

});