import {
  ACTIVE_CPP_PAYMENT_TASKS,
  ACTIVE_CPP_CHANGE_TASKS,
  ACTIVE_EI_COMMON_TASKS,
  ACTIVE_EI_PAYMENT_TASKS,
  ACTIVE_EI_DOCS_TASKS,
} from '../contents/DashboardBenefitTasksConstants'

export function CreateBenefitCardObj(
  programCode,
  statusCode,
  typeCode,
  summaries
) {
  const benefit = {
    programCode: programCode,
    statusCode: statusCode,
    typeCode: typeCode,
    summaries: summaries, // an array of BenefitSummaries
  }
  const taskGroupMatch = MapBenefitToTaskGroups(programCode, statusCode)
  if (taskGroupMatch) {
    benefit.taskGroups = taskGroupMatch.tasksGroups
    benefit.taskHeadingKey = taskGroupMatch.taskHeadingKey
  }
  return benefit
}

//Programs
function MapBenefitToTaskGroups(programCode, statusCode) {
  const group = TASK_GROUPS.find(
    (tg) => tg.programCode === programCode && tg.statusCode === statusCode
  )
  return group
}

export const ProgramCodes = {
  CPP: 'CPP',
  EI: 'EI',
  OAS: 'OAS',
  GIS: 'GIS',
}

//Card Status

export const StatusCodes = {
  inPayment: 'inPayment',
  benefitUpdate: 'benefitUpdate',
  applicationReceived: 'applicationReceived',
  inactive: 'inactive',
  exahusted: 'exhausted',
}

export const CPPStatus = [
  {
    value: 32294,
    status: StatusCodes.inPayment,
  },
]

export const EIStatus = [
  {
    value: 3433,
    status: StatusCodes.inPayment,
  },
]

//Summaries

export const SummaryTypes = {
  PaymentAmount: 'PaymentAmount',
  NextReport: 'NextReport',
  LatestStatus: 'LatestStatus',
  NextPayment: 'NextPayment',
}

const TASK_GROUPS = [
  {
    programCode: ProgramCodes.CPP,
    statusCode: StatusCodes.inPayment,
    taskHeadingKey: 'paymentsTaxesAccount',
    tasksGroups: [ACTIVE_CPP_PAYMENT_TASKS, ACTIVE_CPP_CHANGE_TASKS],
  },
  {
    programCode: ProgramCodes.EI,
    statusCode: StatusCodes.inPayment,
    taskHeadingKey: 'commonPaymentsTaxesAccount',
    tasksGroups: [
      ACTIVE_EI_COMMON_TASKS,
      ACTIVE_EI_PAYMENT_TASKS,
      ACTIVE_EI_DOCS_TASKS,
    ],
  },
]

export function CreateBenefitSummary(type, value, status) {
  let benefitSummary = {
    type: type, // will define what header text to go with it and any links if applicable
    value: value, // a date or amount, defined by the type
  }
  //only add the status object if it exists
  if (status) {
    benefitSummary.status = status //status is additional text for display
  }
  return benefitSummary
}

//Card Types

export const TypeCodes = {
  CPPBeneficial: 'CPPBeneficial',
  CPPRetirement: 'CPPRetirement',
  CPPDisability: 'CPPDisability',
  EIUnknown: 'EIUnknown',
}

export const CPPTypes = [
  {
    value: 'Beneficial',
    type: TypeCodes.CPPBeneficial,
  },
]

export const EITypes = [
  {
    value: 1,
    type: TypeCodes.EIUnknown,
  },
]

///CPP map
// {
//     "programCode": 32294, //status
//     "benefitCode": 30320, //program name
//     "benefitType": "Beneficial", //active type
//     "benefitStatus": "Active", //latest update XXX
//     "lastPaymentDate": "2021-02-21", //last day paid
//     "finalPaymentDate": "2024-02-13", //last payment (future)
//     "netAmount": 30.32, // payment amount
//     "paymentProcessType": "Monthly" //process type
// }
export function CreateBenefitObjWithCPPData(cppBenefitData) {
  let nextPayment = cppBenefitData.lastPaymentDate
  if (cppBenefitData.PaymentProcessType == 'Monthly') {
    nextPayment = new Date(nextPayment.setMonth(nextPayment.getMonth() + 1))
  }
  let benefit = CreateBenefitCardObj(
    ProgramCodes.CPP,
    CPPStatus.find((s) => s.value == cppBenefitData.programCode).status,
    CPPTypes.find((s) => s.value == cppBenefitData.benefitType).type,
    [
      CreateBenefitSummary(
        SummaryTypes.PaymentAmount,
        cppBenefitData.netAmount
      ),
      CreateBenefitSummary(SummaryTypes.NextPayment, nextPayment),
      CreateBenefitSummary(SummaryTypes.LatestStatus, null, null),
    ]
  )
  return benefit
}

///EI map
// {
//     "claimStatusCode": 3433, // status
//     "enmBenefitType": 1, //active benefit type
//     "messageData": "Important message", //latest update
//     "messageId": 32, //latest update
//     "publishDate": "2021-02-21", //latest update
//     "nextRptDueDate": "2023-04-24", //next report due
//     "programCode": 4543, //program name
//     "netAmount": 32.21 //payment amount
// }
export function CreateBenefitObjWithEIData(eiBenefitData) {
  let benefit = CreateBenefitCardObj(
    ProgramCodes.EI,
    EIStatus.find((s) => s.value == eiBenefitData.claimStatusCode).status,
    EITypes.find((t) => t.value == eiBenefitData.enmBenefitType).type,
    [
      CreateBenefitSummary(SummaryTypes.PaymentAmount, eiBenefitData.netAmount),
      CreateBenefitSummary(
        SummaryTypes.NextReport,
        eiBenefitData.nextRptDueDate
      ),
      CreateBenefitSummary(
        SummaryTypes.LatestStatus,
        eiBenefitData.publishDate,
        eiBenefitData.messageData
      ),
    ]
  )
  return benefit
}
