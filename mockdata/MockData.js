import EIUser1 from './user1/ei.json'
import EIUser2 from './user2/ei.json'
import CPPUser3 from './user3/cpp.json'
import CPPUser4 from './user4/cpp.json'
import OASUser4 from './user4/oas.json'
import CPPDefaultUser from './userDefault/cpp.json'
import OASDefaultUser from './userDefault/oas.json'
import CPPDDefaultUser from './userDefault/cppd.json'
import EIDefaultUser from './userDefault/ei.json'

export const mockData = {
  default: {
    CPP: CPPDefaultUser,
    OAS: OASDefaultUser,
    CPPD: CPPDDefaultUser,
    EI: EIDefaultUser,
  },
  1: {
    CPPD: undefined,
    EI: EIUser1,
  },
  2: {
    CPPD: undefined,
    EI: EIUser2,
  },
  3: {
    CPP: CPPUser3,
    EI: undefined,
  },
  4: {
    CPPD: undefined,
    EI: undefined,
    CPP: CPPUser4,
    OAS: OASUser4,
  },
  5: {
    CPPD: undefined,
    EI: undefined,
  },
}
