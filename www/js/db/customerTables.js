let todolist =
  "CREATE TABLE IF NOT EXISTS todolist \
              ( \
                  ID                         INTEGER PRIMARY KEY  AUTOINCREMENT, \
                  TASKNAME                   TEXT NOT NULL \
              )";

let logins =
  "CREATE TABLE IF NOT EXISTS logins \
              ( \
                  ID                         INTEGER PRIMARY KEY  AUTOINCREMENT, \
                  USERNAME                   TEXT NOT NULL, \
                  PASSWORD                   TEXT NOT NULL \
              )";


let Users =
  "CREATE TABLE IF NOT EXISTS Users \
    ( \
        ID                         INTEGER PRIMARY KEY  AUTOINCREMENT, \
        CC                         TEXT , \
        WBS                        TEXT , \
        USERID                     TEXT , \
        USERROLE                   TEXT , \
        USERNAME                   TEXT , \
        PASSWORD                   TEXT , \
        DESCRIPTION                TEXT ,\
        STATUS                     INTEGER ,\
        CREATEDAT                  TEXT ,\
        UPDATEDAT                  TEXT  \
    )";

  let SerialPortData =
  "CREATE TABLE IF NOT EXISTS SerialPortData \
    ( \
        ID                         INTEGER PRIMARY KEY  AUTOINCREMENT, \
        WEIGHBRIDGE                TEXT , \
        PORTNO                     TEXT , \
        BOADRATE                   TEXT , \
        CREATEDAT                  TEXT , \
        UPDATEDAT                  TEXT \
    )";

    let Weighments =
    "CREATE TABLE IF NOT EXISTS Weighments \
      ( \
          ID                          INTEGER PRIMARY KEY  AUTOINCREMENT, \
          CC                          TEXT, \
          USERID                      TEXT NOT NULL, \
          SLIPNUMBER                  TEXT NOT NULL, \
          VEHICLENUMBER               TEXT NOT NULL, \
          MATERIAL                    TEXT NOT NULL, \
          PARTYNAME                   TEXT NOT NULL, \
          AGENT                       TEXT NOT NULL, \
          REMARKS                     TEXT NOT NULL, \
          WEIGHMENTTYPE               TEXT NOT NULL, \
          GROSSWEIGHT                 INTEGER, \
          TAREWEIGHT                  INTEGER, \
          NETTWEIGHT                  INTEGER, \
          QUANTITY                    TEXT NOT NULL, \
          GROSSDATE                   TEXT NOT NULL, \
          TAREDATE                    TEXT NOT NULL, \
          GROSSTIME                   TEXT NOT NULL, \
          TARETIME                    TEXT NOT NULL, \
          TARE_CAMERAONE              TEXT, \
          TARE_CAMERATWO              TEXT, \
          TARE_CAMERATHREE            TEXT, \
          GROSS_CAMERAONE             TEXT, \
          GROSS_CAMERATWO             TEXT, \
          GROSS_CAMERATHREE           TEXT, \
          CREATED_DATE                TEXT, \
          WBS                         TEXT, \
          STATUS                      INTEGER, \
          PRINT_STATUS                INTEGER, \
          ENTRY_TYPE                  TEXT,\
          FIRST_WT                    TEXT,\
          UPDATED_DATE                TEXT\
      )";
  

let FeidlsMasterSettings =
  "CREATE TABLE IF NOT EXISTS FeildsMasterSettings \
    ( \
        ID                          INTEGER PRIMARY KEY  AUTOINCREMENT, \
        WEIGHBRDIGE_NO              TEXT NOT NULL, \
        FEILDNAME                   TEXT NOT NULL, \
        FEILDTEXT                   TEXT NOT NULL, \
        ISMANDATORY                 TEXT NOT NULL, \
        ISVISIBLE                   TEXT NOT NULL, \
        CREATED_DATE                TEXT NOT NULL, \
        UPDATED_DATE                TEXT NOT NULL \
    )";
    
    let NavbarSettings =
    "CREATE TABLE IF NOT EXISTS Navbar \
      ( \
          ID                          INTEGER PRIMARY KEY  AUTOINCREMENT, \
          TITLE                       TEXT , \
          SUBTITLE                    TEXT , \
          LOGO                        TEXT , \
          UPDATED_DATE                TEXT  \
      )";
      
  let reportHeaderSettings =
      "CREATE TABLE IF NOT EXISTS reportHeader \
        ( \
            ID                          INTEGER PRIMARY KEY  AUTOINCREMENT, \
            TITLE                       TEXT , \
            SUBTITLE                    TEXT , \
            UPDATED_DATE                TEXT  \
        )";


let boomBarrierSettings =
  "CREATE TABLE IF NOT EXISTS boomBarrierSettings \
    ( \
        ID                          INTEGER PRIMARY KEY  AUTOINCREMENT, \
        BOOMBARRIER_NO              TEXT , \
        FEILDNAME                   TEXT , \
        FEILDTEXT                   TEXT , \
        ISMANDATORY                 TEXT , \
        ISVISIBLE                   TEXT , \
        CREATED_DATE                TEXT , \
        UPDATED_DATE                TEXT  \
    )";


    let MasterSettings =
  "CREATE TABLE IF NOT EXISTS MasterSettings \
    ( \
        ID                         INTEGER PRIMARY KEY  AUTOINCREMENT, \
        FEILDNAME                     TEXT, \
        FEILDTEXT                     TEXT, \
        CREATED_DATE                  TEXT, \
        UPDATED_DATE                  TEXT  \
    )";

    let BmrMasterSettings =
    "CREATE TABLE IF NOT EXISTS BmrMasterSettings \
      ( \
          ID                         INTEGER PRIMARY KEY  AUTOINCREMENT, \
          FEILDNAME                     TEXT, \
          FEILDTEXT                     TEXT, \
          FEILDVALUE                    TEXT, \
          CREATED_DATE                  TEXT, \
          UPDATED_DATE                  TEXT \
      )";  

let CompanySettings =
  "CREATE TABLE IF NOT EXISTS CompanySettings \
    ( \
        ID                            INTEGER PRIMARY KEY  AUTOINCREMENT, \
        COMPANYNAME                   TEXT, \
        COMPANYCODE                   TEXT, \
        ADDRESS                       TEXT, \
        CITY                          TEXT, \
        EMAIL                         TEXT, \
        PHONENUMBER                   TEXT, \
        GSTNUMBER                     TEXT, \
        NOOFWEIGHBRIDGES              TEXT \
    )";

    let Registration =
  "CREATE TABLE IF NOT EXISTS Registration \
    ( \
        ID                            INTEGER PRIMARY KEY  AUTOINCREMENT, \
        CC                            TEXT, \
        WBS                           TEXT, \
        COMPANYNAME                   TEXT, \
        ADDRESS                       TEXT, \
        EMAIL                         TEXT, \
        PHONENUMBER                   TEXT, \
        REGISTRATIONKEY               TEXT, \
        DATE_STATUS                   INTEGER, \
        ADMUSERNAME                   TEXT, \
        ADMPASSWORD                   TEXT,  \
        UPLOAD_MAXID                  INTEGER\
    )";

    let SPAdminLogin =
    "CREATE TABLE IF NOT EXISTS SPAdminLogin \
      ( \
          ID                            INTEGER PRIMARY KEY  AUTOINCREMENT, \
          USERROLL                      TEXT, \
          USERNAME                      TEXT, \
          PASSWORD                      TEXT \
      )";
   
let CameraSettings =
  "CREATE TABLE IF NOT EXISTS CameraSettings \
    ( \
        ID                         INTEGER PRIMARY KEY  AUTOINCREMENT, \
        DVRIP_ONE                     TEXT, \
        DVRIP_TWO                     TEXT, \
        DVRIP_THREE                   TEXT, \
        DVRIP_ONE_USERNAME            TEXT, \
        DVRIP_TWO_USERNAME            TEXT, \
        DVRIP_THREE_USERNAME          TEXT, \
        DVRIP_ONE_PASSWORD            TEXT, \
        DVRIP_TWO_PASSWORD            TEXT, \
        DVRIP_THREE_PASSWORD          TEXT, \
        DVRPORT_ONE                   TEXT, \
        DVRPORT_TWO                   TEXT, \
        DVRPORT_THREE                 TEXT, \
        DVR_ONE_ACTIVATE              TEXT, \
        DVR_TWO_ACTIVATE              TEXT, \
        DVR_THREE_ACTIVATE            TEXT, \
        IPPORT_ONE                    TEXT, \
        IPPORT_TWO                    TEXT, \
        IPPORT_THREE                  TEXT, \
        IP_ONE_USERNAME               TEXT, \
        IP_TWO_USERNAME               TEXT, \
        IP_THREE_USERNAME             TEXT, \
        IP_ONE_PASSWORD               TEXT, \
        IP_TWO_PASSWORD               TEXT, \
        IP_THREE_PASSWORD             TEXT, \
        IP_ONE_ACTIVATE               TEXT, \
        IP_TWO_ACTIVATE               TEXT, \
        IP_THREE_ACTIVATE             TEXT, \
        RTSPCAMURL_ONE                TEXT, \
        RTSPCAMURL_TWO                TEXT, \
        RTSPCAMURL_THREE              TEXT, \
        RTSP_ONE_ACTIVATE             TEXT, \
        RTSP_TWO_ACTIVATE             TEXT, \
        RTSP_THREE_ACTIVATE           TEXT \
    )";

      
    let BmrCameraSettings =
  "CREATE TABLE IF NOT EXISTS BmrCameraSettings \
    ( \
        ID                         INTEGER PRIMARY KEY  AUTOINCREMENT, \
        DVRIP_ONE                     TEXT, \
        DVRIP_TWO                     TEXT, \
        DVRIP_THREE                   TEXT, \
        DVRIP_ONE_USERNAME            TEXT, \
        DVRIP_TWO_USERNAME            TEXT, \
        DVRIP_THREE_USERNAME          TEXT, \
        DVRIP_ONE_PASSWORD            TEXT, \
        DVRIP_TWO_PASSWORD            TEXT, \
        DVRIP_THREE_PASSWORD          TEXT, \
        DVRPORT_ONE                   TEXT, \
        DVRPORT_TWO                   TEXT, \
        DVRPORT_THREE                 TEXT, \
        DVR_ONE_ACTIVATE              TEXT, \
        DVR_TWO_ACTIVATE              TEXT, \
        DVR_THREE_ACTIVATE            TEXT, \
        IPPORT_ONE                    TEXT, \
        IPPORT_TWO                    TEXT, \
        IPPORT_THREE                  TEXT, \
        IP_ONE_USERNAME               TEXT, \
        IP_TWO_USERNAME               TEXT, \
        IP_THREE_USERNAME             TEXT, \
        IP_ONE_PASSWORD               TEXT, \
        IP_TWO_PASSWORD               TEXT, \
        IP_THREE_PASSWORD             TEXT, \
        IP_ONE_ACTIVATE               TEXT, \
        IP_TWO_ACTIVATE               TEXT, \
        IP_THREE_ACTIVATE             TEXT, \
        RTSPCAMURL_ONE                TEXT, \
        RTSPCAMURL_TWO                TEXT, \
        RTSPCAMURL_THREE              TEXT, \
        RTSP_ONE_ACTIVATE             TEXT, \
        RTSP_TWO_ACTIVATE             TEXT, \
        RTSP_THREE_ACTIVATE           TEXT \
    )";

let GateEntry =
  "CREATE TABLE IF NOT EXISTS GateEntry \
    ( \
        ID                         INTEGER PRIMARY KEY  AUTOINCREMENT, \
        USERID                        TEXT, \
        SLIPNUMBER                    TEXT, \
        DATE                          TEXT, \
        GATE_ENTRY_TYPE               TEXT, \
        DEPARTMENT                    TEXT, \
        OUTLET                        TEXT, \
        FLOWCLASSIFY                  TEXT, \
        GATE                          TEXT, \
        ISWEIGHMENT_REQUIRED          TEXT, \
        WEIGHBRIDGE                   TEXT, \
        WEIGHMENT_TYPE                TEXT, \
        WEIGHINGTYPE                  TEXT, \
        MATERIAL_TRANSACTION          TEXT, \
        MATERIAL_TYPE                 TEXT, \
        AGENT                         TEXT, \
        VEHICLE                       TEXT, \
        VENDOR_OR_CUSTNAME            TEXT, \
        CUST_VILLAGE_OR_CITY          TEXT, \
        BILL_REFERENCE_NO             TEXT, \
        BILL_DATE                     TEXT, \
        STAFF_NAME                    TEXT, \
        VISITOR                       TEXT, \
        GATE_IN_DATE                  TEXT, \
        GATE_OUT_DATE                 TEXT, \
        GATE_IN_TIME                  TEXT, \
        GATE_OUT_TIME                 TEXT, \
        GATE_STATUS                   TEXT, \
        SCANNER_TIMER                 TEXT, \
        NARRATION                     TEXT, \
        ATTACHMENT_ONE                TEXT, \
        ATTACHMENT_TWO                TEXT, \
        ATTACHMENT_THREE              TEXT, \
        ATTACHMENT_FOUR               TEXT, \
        VEHICLE_PHOTO_IN              TEXT, \
        VEHICLE_PHOTO_OUT             TEXT, \
        VEHICLE_NUMBER                TEXT, \
        QR_PATH                       TEXT, \
        QR_STATUS                     TEXT, \
        QR_CODE                       TEXT, \
        CREATED_DATE                  TEXT, \
        UPDATED_DATE                  TEXT \
    )";

let GateEntryItems =
  "CREATE TABLE IF NOT EXISTS CameraSettings \
    ( \
        ID                         INTEGER PRIMARY KEY  AUTOINCREMENT, \
        SLIPNUMBER                    TEXT NOT NULL, \
        ITEM                          TEXT NOT NULL, \
        UNIT                          TEXT NOT NULL, \
        QTY                           TEXT NOT NULL, \
        CREATED_AT                    TEXT NOT NULL, \
        UPDATED_AT                    TEXT NOT NULL \
    )";

let APP_SETTINGS =
  "CREATE TABLE IF NOT EXISTS CameraSettings \
    ( \
        ID                         INTEGER PRIMARY KEY  AUTOINCREMENT, \
        REG_ID                     TEXT NOT NULL, \
        FEATURE_STATUS             TEXT NOT NULL, \
        STATUS                     TEXT NOT NULL, \
        CREATED_AT                 TEXT NOT NULL, \
        UPDATED_AT                 TEXT NOT NULL \
   )";

let FilePath =
"CREATE TABLE IF NOT EXISTS  FilePath \
  ( \
      ID                         INTEGER PRIMARY KEY  AUTOINCREMENT, \
      filePath                     TEXT NOT NULL, \
      CREATEDATE                   TEXT NOT NULL \
  )";
      