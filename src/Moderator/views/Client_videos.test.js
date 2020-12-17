import React from "react";
import { shallow } from "enzyme";
import Client_videos from "./Client_videos";

describe("Client videos Testing", ()=>{
    let wrapper;
    beforeEach(()=> {
        wrapper = shallow(<Client_videos/>);
    });
    test("render buttons", () => {
        //console.log(wrapper.debug());

    });

    test("render the text of headers", () => {
        const h3=wrapper.find('h3.card-title');
        const result1=h3.text();
        expect(result1).toBe('Client Videos');

        const h1=wrapper.find('h1');
        const result2=h1.text();
        expect(result2).toBe('Client videos');
    });

});