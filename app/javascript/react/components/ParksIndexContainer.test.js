import React from "react"
import Enzyme, { mount } from "enzyme"
import { act } from "react-dom/test-utils"
import Adapter from "enzyme-adapter-react-16"

import ParkTile from "./ParkTile"
import ParksIndexContainer from "./ParksIndexContainer"

Enzyme.configure({ adapter: new Adapter() })
