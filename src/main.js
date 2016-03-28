import * as L              from "partial.lenses"
import Atom                from "kefir.atom"
import K, {bind}           from "kefir.react.html"
import React               from "react"
import Stored, {expireNow} from "atom.storage"
import Undo                from "atom.undo"

import BMI          from "./bmi-control"
import {mock}       from "./bmi-meta"
import Checkbox     from "./checkbox"
import Checkboxes   from "./checkboxes"
import WithUndoRedo from "./with-undo-redo"
import Clock        from "./clock"
import Counter      from "./counter"
import InputAdd     from "./input-add"
import Phonebook    from "./phonebook-control"
import Scroll       from "./scroll"
import Converter    from "./converter"
import BigTable, * as BT from "./big-table-control"

import {pass} from "./util"

expireNow({storage: localStorage, regex: /^kral-examples:/})

const Src = ({src, lines = ""}) =>
  <a target="_blank"
     href={`https://github.com/calmm-js/kral-examples/blob/master/src/${src}${lines}`}>{src}</a>

export default () =>
  <main>
    <h1>Kefir+React+Atom Examples</h1>

    <a href="https://github.com/calmm-js/kral-examples">GitHub</a>

    <section>
      <h2 id="big-table">Big table</h2>
      {pass(() => {
        const model = Atom(BT.mock)

        const Slider = ({prop, ...props}) =>
          <K.label>{prop}: {model.view(prop)}
            <K.input type="range" {...props} style={{width: "100%"}}
                     {...bind({value: model.lens(prop, L.normalize(Number))})}/>
          </K.label>

        return <div>
            <Slider min={50} max={1000} prop="tableHeight"/>
            <Slider min={0} max={10000} prop="rowCount"/>
            <Slider min={10} max={50} prop="rowHeight"/>
            <BigTable {...{model}}/>
          </div>})}
      <ul>
        <li><Src src="big-table-control.js"/></li>
        <li><Src src="main.js" lines="#L37-L51"/></li>
      </ul>
    </section>

    <section>
      <h2 id="counter">Simple counter</h2>
      <Counter/>
      <ul>
        <li><Src src="counter.js"/></li>
        <li><Src src="main.js" lines="#L60"/></li>
      </ul>
    </section>

    <section>
      <h2 id="clock">Simple clock</h2>
      <Clock/>
      <ul>
        <li><Src src="clock.js"/></li>
        <li><Src src="main.js" lines="#L69"/></li>
      </ul>
    </section>

    <section>
      <h2 id="checkbox">Simple checkbox</h2>
      <Checkbox/>
      <ul>
        <li><Src src="checkbox.js"/></li>
        <li><Src src="main.js" lines="#L78"/></li>
      </ul>
    </section>

    <section>
      <h2 id="converter">Celcius to Fahrenheit converter</h2>
      <Converter/>
      <ul>
        <li><Src src="converter.js"/></li>
        <li><Src src="main.js" lines="#L87"/></li>
      </ul>
    </section>

    <section>
      <h2 id="undo-redo-checkboxes">Checkboxes with Undo-Redo</h2>
      {pass(Undo({value: [true, false, true],
                  Atom: value => Stored({value,
                                         key: "kral-examples:undo-redo-checkboxes",
                                         storage: localStorage,
                                         time: 1*60*60*1000, // 1 hour
                                         Atom})}), checkeds =>
            <WithUndoRedo undo={checkeds.undo}
                          redo={checkeds.redo}>
              <Checkboxes checkeds={checkeds.lens(L.define([]))}/>
            </WithUndoRedo>)}
      <ul>
        <li><Src src="with-undo-redo.js"/></li>
        <li><Src src="checkboxes.js"/></li>
        <li><Src src="main.js" lines="#L96-L105"/></li>
      </ul>
    </section>

    <section>
      <h2 id="input-add">Input Add</h2>
      <InputAdd/>
      <ul>
        <li><Src src="input-add.js"/></li>
        <li><Src src="main.js" lines="#L115"/></li>
      </ul>
    </section>

    <section>
      <h2 id="scroll">Scroll</h2>
      <Scroll/>
      <ul>
        <li><Src src="scroll.js"/></li>
        <li><Src src="main.js" lines="#L124"/></li>
      </ul>
    </section>

    <section>
      <h2 id="phonebook">Phonebook</h2>
      <Phonebook/>
      <ul>
        <li><Src src="phonebook-control.js"/></li>
        <li><Src src="phonebook-meta.js"/></li>
        <li><Src src="main.js" lines="#L133"/></li>
      </ul>
    </section>

    <section>
      <h2 id="bmi">BMI control</h2>
      <BMI/>
      <ul>
        <li><Src src="bmi-control.js"/></li>
        <li><Src src="bmi-meta.js"/></li>
        <li><Src src="main.js" lines="#L143"/></li>
      </ul>
    </section>

    <section>
      <h2 id="bmi-shared">BMI controls with a shared model</h2>
      <div style={{display: "flex"}}>
        {pass(Atom(mock), bmi =>
              [<BMI key="1" bmi={bmi}/>,
               <BMI key="2" bmi={bmi}/>])}
      </div>
      <ul>
        <li><Src src="main.js" lines="#L154-L156"/></li>
      </ul>
    </section>
  </main>
