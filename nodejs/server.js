var express = require('express')
var app = express()

var cors = require('cors');    
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.post('/api/Token/Login', function (req, res) {
    let data = {
        "Code": 0,
        "Message": "数据获取成功！",
        "Data": {
          "AccountID": "10223",
          "DepartmentName": "某某测试机构",
          "UserName": "17681957749",
          "Name": "17681957749",
          "AtricleTotal": 0,
          "ImagePhoto": "http://qn.res.aheading.com/231b4422-61b9-4424-d2ee-7b964fb638c1",
          "Mobile": "17681957749",
          "Email": null,
          "LastLogin": "2020-07-21 14:00:16",
          "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIxNzY4MTk1Nzc0OSIsIm5vbmNlIjoiMTAyMjMiLCJuYmYiOiIxMjA0IiwiYXpwIjoiMSIsImFkbWluaXN0cmF0aXZlX2xldmVsIjoiMSIsIlJlZ2lvbnNDb2RlIjoiMzYwNTAwIiwiZXhwIjoxNTk1MzQ3MjE2LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjU2MjY4LyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTYyNjgvIn0.3RocB6IWhq4ZhLjCF1dYb1-MsISKEn-G0dwpnPKNpYU",
          "Expires": 600,
          "IsUpdateStartPwd": true,
          "RefreshToken": "26f11ee3-4b99-4ac7-8a55-154ba786b34e|17681957749",
          "ExpiresTime": "2020-07-22 00:00:16",
          "NickName": "某某测试",
          "CreateDate": "2018-10-18 00:47:18",
          "AccountStatus": "1",
          "CarriersTotal": 0,
          "ArticleCount": 0,
          "CertificationTime": "2018-10-18 00:53:58",
          "RegionsName": "新余市",
          "AccountStatusName": "通过",
          "Founder": null,
          "AccountType": "机构管理员"
        }
      };
    res.send(JSON.stringify(data));
})
// 站点基础配置项
app.get('/api/Configs/GetProjectSettings', function (req, res) {
    let data = {
        "Code": 0,
        "Message": "数据获取成功！",
        "Data": {
          "ProjectType": 2,
          "ProjectName": "城媒体",
          "RegionsCode": 340000,
          "Giiso": {
            "OuterLoginUrl": "https://writer.giiso.com/open/outerLogin.do",
            "OuterCode": "TEST"
          },
          "CopyrightName": "鹰潭日报社版权所有",
          "ICPName": "赣公网安备XXXXXXXXXX",
          "CityNetUrl": "http://192.168.1.33:8504",
          "LogoUrl": "http://192.168.1.33:8504/cm/for/xxr/Logo/logo.png",
          "LoginPage": {
            "Logo": "http://192.168.1.33:8504/cm/for/cm/loginpage/Logo.png",
            "Background": "http://192.168.1.33:8504/cm/for/cm/loginpage/Background.png",
            "CenterImage": "http://192.168.1.33:8504/cm/for/cm/loginpage/CenterImage.png",
            "BottomImage": "http://192.168.1.33:8504/cm/for/cm/loginpage/BottomImage.png"
          },
          "HelpUrl": "https://support.qq.com/products/32876",
          "XiangZhengRongUrl": "http://xzr.ahnews.com.cn:8001/login.jsp"
        }
    };
    res.send(JSON.stringify(data));
})
// 配置主题色
app.get('/api/Configs/GetThemeConfig', function (req, res) {
    let data = {
        "Code": 0,
        "Message": "数据获取成功！",
        "Data": {
          "ConfigKey": "CurrentTheme",
          "ConfigValue": "#1890ff",
          "AttributeDefaultValue": "#000"
        }
    };
    res.send(JSON.stringify(data));
})
// 目录权限
app.get('/api/Power/GetAccountRights', function (req, res) {
    let data = {
        "Code": 0,
        "Message": "数据获取成功！",
        "Data": [
          {
            "ChildList": [
              {
                "ChildList": [],
                "OperateList": [
                  {
                    "ModelRightID": 316,
                    "ModeID": 62,
                    "RightID": 2,
                    "RightCode": "View",
                    "RightName": "查看",
                    "RightOrder": 2,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 315,
                    "ModeID": 62,
                    "RightID": 1,
                    "RightCode": "Visit",
                    "RightName": "访问",
                    "RightOrder": 11,
                    "IsSelected": false
                  }
                ],
                "ModeID": 62,
                "ModeName": "首页模块",
                "ModeCode": "00",
                "ParentID": 61,
                "Level": 2,
                "ModeUrl": "/index",
                "IsPage": true,
                "IsSelected": false,
                "ModeLevelOrder": 1
              }
            ],
            "OperateList": [
              {
                "ModelRightID": 312,
                "ModeID": 61,
                "RightID": 2,
                "RightCode": "View",
                "RightName": "查看",
                "RightOrder": 2,
                "IsSelected": false
              },
              {
                "ModelRightID": 313,
                "ModeID": 61,
                "RightID": 3,
                "RightCode": "Create",
                "RightName": "新增",
                "RightOrder": 3,
                "IsSelected": false
              },
              {
                "ModelRightID": 311,
                "ModeID": 61,
                "RightID": 1,
                "RightCode": "Visit",
                "RightName": "访问",
                "RightOrder": 11,
                "IsSelected": false
              }
            ],
            "ModeID": 61,
            "ModeName": "首页",
            "ModeCode": "index",
            "ParentID": 0,
            "Level": 1,
            "ModeUrl": "/",
            "IsPage": true,
            "IsSelected": false,
            "ModeLevelOrder": 1
          },
          {
            "ChildList": [
              {
                "ChildList": [
                  {
                    "ChildList": [],
                    "OperateList": [
                      {
                        "ModelRightID": 2339,
                        "ModeID": 1126,
                        "RightID": 185,
                        "RightCode": "PublicArticle_Adopt",
                        "RightName": "公共稿库/选用",
                        "RightOrder": 1,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2269,
                        "ModeID": 1126,
                        "RightID": 175,
                        "RightCode": "Write_Read",
                        "RightName": "写稿（文本）/预览",
                        "RightOrder": 2,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2268,
                        "ModeID": 1126,
                        "RightID": 176,
                        "RightCode": "Write_Update",
                        "RightName": "写稿（文本）/保存",
                        "RightOrder": 3,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2266,
                        "ModeID": 1126,
                        "RightID": 177,
                        "RightCode": "Write_Deliver",
                        "RightName": "写稿（文本）/投稿",
                        "RightOrder": 4,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2267,
                        "ModeID": 1126,
                        "RightID": 183,
                        "RightCode": "check_Send",
                        "RightName": "稿件编辑器/送审",
                        "RightOrder": 4,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2124,
                        "ModeID": 1126,
                        "RightID": 4,
                        "RightCode": "Edit",
                        "RightName": "编辑",
                        "RightOrder": 4,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2270,
                        "ModeID": 1126,
                        "RightID": 178,
                        "RightCode": "Write_Send",
                        "RightName": "写稿（文本）/存审",
                        "RightOrder": 5,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2271,
                        "ModeID": 1126,
                        "RightID": 179,
                        "RightCode": "Write_Sy",
                        "RightName": "写稿（文本）/存签",
                        "RightOrder": 6,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2129,
                        "ModeID": 1126,
                        "RightID": 9,
                        "RightCode": "Write",
                        "RightName": "写稿",
                        "RightOrder": 9,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2121,
                        "ModeID": 1126,
                        "RightID": 1,
                        "RightCode": "Visit",
                        "RightName": "访问",
                        "RightOrder": 11,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2272,
                        "ModeID": 1126,
                        "RightID": 33,
                        "RightCode": "Center_Synchronized",
                        "RightName": "稿件中心/同步",
                        "RightOrder": 12,
                        "IsSelected": false
                      }
                    ],
                    "ModeID": 1126,
                    "ModeName": "公共稿库",
                    "ModeCode": "manuFeedboxPublic",
                    "ParentID": 1122,
                    "Level": 3,
                    "ModeUrl": "/editorialCenter/gathering/manuFeedboxPublic",
                    "IsPage": true,
                    "IsSelected": false,
                    "ModeLevelOrder": 1
                  },
                  {
                    "ChildList": [],
                    "OperateList": [
                      {
                        "ModelRightID": 2349,
                        "ModeID": 1136,
                        "RightID": 1,
                        "RightCode": "Visit",
                        "RightName": "访问",
                        "RightOrder": 11,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2351,
                        "ModeID": 1136,
                        "RightID": 138,
                        "RightCode": "ArticleSource_sy",
                        "RightName": "机构稿库/同步稿件",
                        "RightOrder": 117,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2352,
                        "ModeID": 1136,
                        "RightID": 139,
                        "RightCode": "ArSource_CirRecord",
                        "RightName": "机构稿库/流转路线",
                        "RightOrder": 118,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2353,
                        "ModeID": 1136,
                        "RightID": 140,
                        "RightCode": "ArSource_Record",
                        "RightName": "机构稿库/传播轨迹",
                        "RightOrder": 119,
                        "IsSelected": false
                      }
                    ],
                    "ModeID": 1136,
                    "ModeName": "机构稿库",
                    "ModeCode": "InstitutionalRepository",
                    "ParentID": 1122,
                    "Level": 3,
                    "ModeUrl": "/editorialCenter/gathering/InstitutionalRepository",
                    "IsPage": true,
                    "IsSelected": false,
                    "ModeLevelOrder": 1
                  },
                  {
                    "ChildList": [],
                    "OperateList": [
                      {
                        "ModelRightID": 1009,
                        "ModeID": 111,
                        "RightID": 8,
                        "RightCode": "Retractions",
                        "RightName": "撤稿",
                        "RightOrder": 1,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 1003,
                        "ModeID": 111,
                        "RightID": 2,
                        "RightCode": "View",
                        "RightName": "查看",
                        "RightOrder": 2,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 1004,
                        "ModeID": 111,
                        "RightID": 3,
                        "RightCode": "Create",
                        "RightName": "新增",
                        "RightOrder": 3,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 1005,
                        "ModeID": 111,
                        "RightID": 4,
                        "RightCode": "Edit",
                        "RightName": "编辑",
                        "RightOrder": 4,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 1006,
                        "ModeID": 111,
                        "RightID": 5,
                        "RightCode": "Delete",
                        "RightName": "删除",
                        "RightOrder": 5,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 1007,
                        "ModeID": 111,
                        "RightID": 6,
                        "RightCode": "Audit",
                        "RightName": "审核",
                        "RightOrder": 6,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 1008,
                        "ModeID": 111,
                        "RightID": 7,
                        "RightCode": "Release",
                        "RightName": "发布",
                        "RightOrder": 7,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 1010,
                        "ModeID": 111,
                        "RightID": 9,
                        "RightCode": "Write",
                        "RightName": "写稿",
                        "RightOrder": 9,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 1002,
                        "ModeID": 111,
                        "RightID": 1,
                        "RightCode": "Visit",
                        "RightName": "访问",
                        "RightOrder": 11,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2182,
                        "ModeID": 111,
                        "RightID": 141,
                        "RightCode": "OrgArticle_sy",
                        "RightName": "源稿库/同步稿件",
                        "RightOrder": 120,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2183,
                        "ModeID": 111,
                        "RightID": 142,
                        "RightCode": "OrgArticle_CirRecord",
                        "RightName": "源稿库/流转路线",
                        "RightOrder": 121,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2184,
                        "ModeID": 111,
                        "RightID": 143,
                        "RightCode": "OrgArticle_Record",
                        "RightName": "源稿库/传播轨迹",
                        "RightOrder": 122,
                        "IsSelected": false
                      }
                    ],
                    "ModeID": 111,
                    "ModeName": "源稿库",
                    "ModeCode": "manuscriptSource",
                    "ParentID": 1122,
                    "Level": 3,
                    "ModeUrl": "/editorialCenter/gathering/manuscriptSource",
                    "IsPage": true,
                    "IsSelected": false,
                    "ModeLevelOrder": 1
                  },
                  {
                    "ChildList": [],
                    "OperateList": [
                      {
                        "ModelRightID": 230,
                        "ModeID": 15,
                        "RightID": 2,
                        "RightCode": "View",
                        "RightName": "查看",
                        "RightOrder": 2,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 229,
                        "ModeID": 15,
                        "RightID": 1,
                        "RightCode": "Visit",
                        "RightName": "访问",
                        "RightOrder": 11,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2185,
                        "ModeID": 15,
                        "RightID": 138,
                        "RightCode": "ArticleSource_sy",
                        "RightName": "机构稿库/同步稿件",
                        "RightOrder": 117,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2186,
                        "ModeID": 15,
                        "RightID": 139,
                        "RightCode": "ArSource_CirRecord",
                        "RightName": "机构稿库/流转路线",
                        "RightOrder": 118,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2187,
                        "ModeID": 15,
                        "RightID": 140,
                        "RightCode": "ArSource_Record",
                        "RightName": "机构稿库/传播轨迹",
                        "RightOrder": 119,
                        "IsSelected": false
                      }
                    ],
                    "ModeID": 15,
                    "ModeName": "机构稿件",
                    "ModeCode": "manuscriptCenter",
                    "ParentID": 1122,
                    "Level": 3,
                    "ModeUrl": "/editorialCenter/gathering/manuscriptCenter",
                    "IsPage": true,
                    "IsSelected": false,
                    "ModeLevelOrder": 2
                  },
                  {
                    "ChildList": [],
                    "OperateList": [
                      {
                        "ModelRightID": 2250,
                        "ModeID": 12,
                        "RightID": 174,
                        "RightCode": "Write_135Update",
                        "RightName": "写稿（文本）/去135编辑",
                        "RightOrder": 1,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2251,
                        "ModeID": 12,
                        "RightID": 180,
                        "RightCode": "check_135Update",
                        "RightName": "稿件编辑器/去135编辑",
                        "RightOrder": 1,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2257,
                        "ModeID": 12,
                        "RightID": 181,
                        "RightCode": "check_Sy",
                        "RightName": "稿件编辑器/签发",
                        "RightOrder": 2,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2252,
                        "ModeID": 12,
                        "RightID": 176,
                        "RightCode": "Write_Update",
                        "RightName": "写稿（文本）/保存",
                        "RightOrder": 3,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2258,
                        "ModeID": 12,
                        "RightID": 4,
                        "RightCode": "Edit",
                        "RightName": "编辑",
                        "RightOrder": 4,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2253,
                        "ModeID": 12,
                        "RightID": 177,
                        "RightCode": "Write_Deliver",
                        "RightName": "写稿（文本）/投稿",
                        "RightOrder": 4,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2254,
                        "ModeID": 12,
                        "RightID": 183,
                        "RightCode": "check_Send",
                        "RightName": "稿件编辑器/送审",
                        "RightOrder": 4,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2255,
                        "ModeID": 12,
                        "RightID": 178,
                        "RightCode": "Write_Send",
                        "RightName": "写稿（文本）/存审",
                        "RightOrder": 5,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2256,
                        "ModeID": 12,
                        "RightID": 179,
                        "RightCode": "Write_Sy",
                        "RightName": "写稿（文本）/存签",
                        "RightOrder": 6,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2259,
                        "ModeID": 12,
                        "RightID": 9,
                        "RightCode": "Write",
                        "RightName": "写稿",
                        "RightOrder": 9,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2249,
                        "ModeID": 12,
                        "RightID": 1,
                        "RightCode": "Visit",
                        "RightName": "访问",
                        "RightOrder": 11,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2261,
                        "ModeID": 12,
                        "RightID": 108,
                        "RightCode": "Manuscript_Deliver",
                        "RightName": "草稿箱/投稿",
                        "RightOrder": 87,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2262,
                        "ModeID": 12,
                        "RightID": 109,
                        "RightCode": "Manuscript_Send",
                        "RightName": "草稿箱/送审",
                        "RightOrder": 88,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2263,
                        "ModeID": 12,
                        "RightID": 110,
                        "RightCode": "Manuscript_update",
                        "RightName": "草稿箱/编辑",
                        "RightOrder": 89,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2264,
                        "ModeID": 12,
                        "RightID": 111,
                        "RightCode": "Manuscript_Sy",
                        "RightName": "草稿箱/签发",
                        "RightOrder": 90,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2265,
                        "ModeID": 12,
                        "RightID": 112,
                        "RightCode": "Manuscript_Delete",
                        "RightName": "草稿箱/删除",
                        "RightOrder": 91,
                        "IsSelected": false
                      }
                    ],
                    "ModeID": 12,
                    "ModeName": "草稿箱",
                    "ModeCode": "annulsManuscript",
                    "ParentID": 1122,
                    "Level": 3,
                    "ModeUrl": "/editorialCenter/gathering/annulsManuscript",
                    "IsPage": true,
                    "IsSelected": false,
                    "ModeLevelOrder": 2
                  },
                  {
                    "ChildList": [],
                    "OperateList": [
                      {
                        "ModelRightID": 953,
                        "ModeID": 105,
                        "RightID": 8,
                        "RightCode": "Retractions",
                        "RightName": "撤稿",
                        "RightOrder": 1,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 947,
                        "ModeID": 105,
                        "RightID": 2,
                        "RightCode": "View",
                        "RightName": "查看",
                        "RightOrder": 2,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 948,
                        "ModeID": 105,
                        "RightID": 3,
                        "RightCode": "Create",
                        "RightName": "新增",
                        "RightOrder": 3,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 949,
                        "ModeID": 105,
                        "RightID": 4,
                        "RightCode": "Edit",
                        "RightName": "编辑",
                        "RightOrder": 4,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 950,
                        "ModeID": 105,
                        "RightID": 5,
                        "RightCode": "Delete",
                        "RightName": "删除",
                        "RightOrder": 5,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 951,
                        "ModeID": 105,
                        "RightID": 6,
                        "RightCode": "Audit",
                        "RightName": "审核",
                        "RightOrder": 6,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 952,
                        "ModeID": 105,
                        "RightID": 7,
                        "RightCode": "Release",
                        "RightName": "发布",
                        "RightOrder": 7,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 954,
                        "ModeID": 105,
                        "RightID": 9,
                        "RightCode": "Write",
                        "RightName": "写稿",
                        "RightOrder": 9,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 955,
                        "ModeID": 105,
                        "RightID": 10,
                        "RightCode": "BatchReview",
                        "RightName": "批量审核",
                        "RightOrder": 10,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 946,
                        "ModeID": 105,
                        "RightID": 1,
                        "RightCode": "Visit",
                        "RightName": "访问",
                        "RightOrder": 11,
                        "IsSelected": false
                      }
                    ],
                    "ModeID": 105,
                    "ModeName": "已投稿件",
                    "ModeCode": "manuscriptsubmitted",
                    "ParentID": 1122,
                    "Level": 3,
                    "ModeUrl": "/editorialCenter/gathering/manuscriptsubmitted",
                    "IsPage": true,
                    "IsSelected": false,
                    "ModeLevelOrder": 3
                  }
                ],
                "OperateList": [
                  {
                    "ModelRightID": 2084,
                    "ModeID": 1122,
                    "RightID": 4,
                    "RightCode": "Edit",
                    "RightName": "编辑",
                    "RightOrder": 4,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2089,
                    "ModeID": 1122,
                    "RightID": 9,
                    "RightCode": "Write",
                    "RightName": "写稿",
                    "RightOrder": 9,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2081,
                    "ModeID": 1122,
                    "RightID": 1,
                    "RightCode": "Visit",
                    "RightName": "访问",
                    "RightOrder": 11,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 3356,
                    "ModeID": 1122,
                    "RightID": 48,
                    "RightCode": "custom_Read",
                    "RightName": "自定义榜单/预览",
                    "RightOrder": 27,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2343,
                    "ModeID": 1122,
                    "RightID": 138,
                    "RightCode": "ArticleSource_sy",
                    "RightName": "机构稿库/同步稿件",
                    "RightOrder": 117,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 3357,
                    "ModeID": 1122,
                    "RightID": 139,
                    "RightCode": "ArSource_CirRecord",
                    "RightName": "机构稿库/流转路线",
                    "RightOrder": 118,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 3358,
                    "ModeID": 1122,
                    "RightID": 140,
                    "RightCode": "ArSource_Record",
                    "RightName": "机构稿库/传播轨迹",
                    "RightOrder": 119,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2344,
                    "ModeID": 1122,
                    "RightID": 141,
                    "RightCode": "OrgArticle_sy",
                    "RightName": "源稿库/同步稿件",
                    "RightOrder": 120,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 3359,
                    "ModeID": 1122,
                    "RightID": 142,
                    "RightCode": "OrgArticle_CirRecord",
                    "RightName": "源稿库/流转路线",
                    "RightOrder": 121,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 3360,
                    "ModeID": 1122,
                    "RightID": 143,
                    "RightCode": "OrgArticle_Record",
                    "RightName": "源稿库/传播轨迹",
                    "RightOrder": 122,
                    "IsSelected": false
                  }
                ],
                "ModeID": 1122,
                "ModeName": "采",
                "ModeCode": "Gathering",
                "ParentID": 108,
                "Level": 2,
                "ModeUrl": "",
                "IsPage": true,
                "IsSelected": false,
                "ModeLevelOrder": 1
              },
              {
                "ChildList": [
                  {
                    "ChildList": [],
                    "OperateList": [
                      {
                        "ModelRightID": 2036,
                        "ModeID": 1112,
                        "RightID": 8,
                        "RightCode": "Retractions",
                        "RightName": "撤稿",
                        "RightOrder": 1,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2030,
                        "ModeID": 1112,
                        "RightID": 2,
                        "RightCode": "View",
                        "RightName": "查看",
                        "RightOrder": 2,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2031,
                        "ModeID": 1112,
                        "RightID": 3,
                        "RightCode": "Create",
                        "RightName": "新增",
                        "RightOrder": 3,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2032,
                        "ModeID": 1112,
                        "RightID": 4,
                        "RightCode": "Edit",
                        "RightName": "编辑",
                        "RightOrder": 4,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2033,
                        "ModeID": 1112,
                        "RightID": 5,
                        "RightCode": "Delete",
                        "RightName": "删除",
                        "RightOrder": 5,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2034,
                        "ModeID": 1112,
                        "RightID": 6,
                        "RightCode": "Audit",
                        "RightName": "审核",
                        "RightOrder": 6,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2035,
                        "ModeID": 1112,
                        "RightID": 7,
                        "RightCode": "Release",
                        "RightName": "发布",
                        "RightOrder": 7,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2037,
                        "ModeID": 1112,
                        "RightID": 9,
                        "RightCode": "Write",
                        "RightName": "写稿",
                        "RightOrder": 9,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2038,
                        "ModeID": 1112,
                        "RightID": 10,
                        "RightCode": "BatchReview",
                        "RightName": "批量审核",
                        "RightOrder": 10,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2029,
                        "ModeID": 1112,
                        "RightID": 1,
                        "RightCode": "Visit",
                        "RightName": "访问",
                        "RightOrder": 11,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2191,
                        "ModeID": 1112,
                        "RightID": 133,
                        "RightCode": "WaitPublish_sy",
                        "RightName": "代签稿件/签发",
                        "RightOrder": 112,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2192,
                        "ModeID": 1112,
                        "RightID": 134,
                        "RightCode": "WaitPublish_Record",
                        "RightName": "代签稿件/审核记录",
                        "RightOrder": 113,
                        "IsSelected": false
                      }
                    ],
                    "ModeID": 1112,
                    "ModeName": "待签稿库",
                    "ModeCode": "tobeIssuedManuscript",
                    "ParentID": 1125,
                    "Level": 3,
                    "ModeUrl": "/editorialCenter/issue/tobeIssuedManuscript",
                    "IsPage": true,
                    "IsSelected": false,
                    "ModeLevelOrder": 1
                  },
                  {
                    "ChildList": [],
                    "OperateList": [
                      {
                        "ModelRightID": 2236,
                        "ModeID": 13,
                        "RightID": 125,
                        "RightCode": "MyRelease_sy",
                        "RightName": "已发稿件/同步",
                        "RightOrder": 104,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2235,
                        "ModeID": 13,
                        "RightID": 126,
                        "RightCode": "MyRelease_Revoke",
                        "RightName": "已发稿件/撤稿",
                        "RightOrder": 105,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2234,
                        "ModeID": 13,
                        "RightID": 127,
                        "RightCode": "MyRelease_ProcRecord",
                        "RightName": "已发稿件/审核记录",
                        "RightOrder": 106,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2233,
                        "ModeID": 13,
                        "RightID": 128,
                        "RightCode": "MyRelease_Update",
                        "RightName": "已发稿件/编辑",
                        "RightOrder": 107,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2232,
                        "ModeID": 13,
                        "RightID": 129,
                        "RightCode": "MyRelease_SendWeibo",
                        "RightName": "已发稿件/发微博",
                        "RightOrder": 108,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2231,
                        "ModeID": 13,
                        "RightID": 130,
                        "RightCode": "MyRelease_Send",
                        "RightName": "已发稿件/送审",
                        "RightOrder": 109,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2237,
                        "ModeID": 13,
                        "RightID": 131,
                        "RightCode": "MyRelease_syTemp",
                        "RightName": "已发稿件/签发",
                        "RightOrder": 110,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2238,
                        "ModeID": 13,
                        "RightID": 132,
                        "RightCode": "MyRelease_Delete",
                        "RightName": "已发稿件/删除",
                        "RightOrder": 111,
                        "IsSelected": false
                      }
                    ],
                    "ModeID": 13,
                    "ModeName": "已发稿库",
                    "ModeCode": "allManuscript",
                    "ParentID": 1125,
                    "Level": 3,
                    "ModeUrl": "/editorialCenter/issue/allManuscript",
                    "IsPage": true,
                    "IsSelected": false,
                    "ModeLevelOrder": 2
                  }
                ],
                "OperateList": [
                  {
                    "ModelRightID": 2118,
                    "ModeID": 1125,
                    "RightID": 8,
                    "RightCode": "Retractions",
                    "RightName": "撤稿",
                    "RightOrder": 1,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2112,
                    "ModeID": 1125,
                    "RightID": 2,
                    "RightCode": "View",
                    "RightName": "查看",
                    "RightOrder": 2,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2113,
                    "ModeID": 1125,
                    "RightID": 3,
                    "RightCode": "Create",
                    "RightName": "新增",
                    "RightOrder": 3,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2114,
                    "ModeID": 1125,
                    "RightID": 4,
                    "RightCode": "Edit",
                    "RightName": "编辑",
                    "RightOrder": 4,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2115,
                    "ModeID": 1125,
                    "RightID": 5,
                    "RightCode": "Delete",
                    "RightName": "删除",
                    "RightOrder": 5,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2116,
                    "ModeID": 1125,
                    "RightID": 6,
                    "RightCode": "Audit",
                    "RightName": "审核",
                    "RightOrder": 6,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2117,
                    "ModeID": 1125,
                    "RightID": 7,
                    "RightCode": "Release",
                    "RightName": "发布",
                    "RightOrder": 7,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2119,
                    "ModeID": 1125,
                    "RightID": 9,
                    "RightCode": "Write",
                    "RightName": "写稿",
                    "RightOrder": 9,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2120,
                    "ModeID": 1125,
                    "RightID": 10,
                    "RightCode": "BatchReview",
                    "RightName": "批量审核",
                    "RightOrder": 10,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2111,
                    "ModeID": 1125,
                    "RightID": 1,
                    "RightCode": "Visit",
                    "RightName": "访问",
                    "RightOrder": 11,
                    "IsSelected": false
                  }
                ],
                "ModeID": 1125,
                "ModeName": "发",
                "ModeCode": "Issue",
                "ParentID": 108,
                "Level": 2,
                "ModeUrl": "",
                "IsPage": true,
                "IsSelected": false,
                "ModeLevelOrder": 2
              },
              {
                "ChildList": [
                  {
                    "ChildList": [],
                    "OperateList": [
                      {
                        "ModelRightID": 2260,
                        "ModeID": 1113,
                        "RightID": 1,
                        "RightCode": "Visit",
                        "RightName": "访问",
                        "RightOrder": 11,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2147,
                        "ModeID": 1113,
                        "RightID": 114,
                        "RightCode": "WaitArticle_Send",
                        "RightName": "待编稿件/送审",
                        "RightOrder": 91,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2148,
                        "ModeID": 1113,
                        "RightID": 113,
                        "RightCode": "WaitArticle_Update",
                        "RightName": "待编稿件/编辑",
                        "RightOrder": 92,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2149,
                        "ModeID": 1113,
                        "RightID": 115,
                        "RightCode": "WaitArticle_Sy",
                        "RightName": "待编稿件/签发",
                        "RightOrder": 94,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2150,
                        "ModeID": 1113,
                        "RightID": 116,
                        "RightCode": "WaitArticle_Transfer",
                        "RightName": "待编稿件/传稿",
                        "RightOrder": 95,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2350,
                        "ModeID": 1113,
                        "RightID": 189,
                        "RightCode": "WaitiArticle_Adopt",
                        "RightName": "待编稿件/采用",
                        "RightOrder": 96,
                        "IsSelected": false
                      }
                    ],
                    "ModeID": 1113,
                    "ModeName": "待编稿件",
                    "ModeCode": "tobeEditedManuscript",
                    "ParentID": 1123,
                    "Level": 3,
                    "ModeUrl": "/editorialCenter/edit/tobeEditedManuscript",
                    "IsPage": true,
                    "IsSelected": false,
                    "ModeLevelOrder": 1
                  },
                  {
                    "ChildList": [],
                    "OperateList": [
                      {
                        "ModelRightID": 2355,
                        "ModeID": 106,
                        "RightID": 190,
                        "RightCode": "manuscript_Adopt",
                        "RightName": "个人稿库/选用",
                        "RightOrder": 1,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 957,
                        "ModeID": 106,
                        "RightID": 2,
                        "RightCode": "View",
                        "RightName": "查看",
                        "RightOrder": 2,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 959,
                        "ModeID": 106,
                        "RightID": 4,
                        "RightCode": "Edit",
                        "RightName": "编辑",
                        "RightOrder": 4,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 964,
                        "ModeID": 106,
                        "RightID": 9,
                        "RightCode": "Write",
                        "RightName": "写稿",
                        "RightOrder": 9,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 956,
                        "ModeID": 106,
                        "RightID": 1,
                        "RightCode": "Visit",
                        "RightName": "访问",
                        "RightOrder": 11,
                        "IsSelected": false
                      }
                    ],
                    "ModeID": 106,
                    "ModeName": "个人稿库",
                    "ModeCode": "manuscriptFeedbox",
                    "ParentID": 1123,
                    "Level": 3,
                    "ModeUrl": "/editorialCenter/edit/manuscriptFeedbox",
                    "IsPage": true,
                    "IsSelected": false,
                    "ModeLevelOrder": 2
                  }
                ],
                "OperateList": [
                  {
                    "ModelRightID": 2098,
                    "ModeID": 1123,
                    "RightID": 8,
                    "RightCode": "Retractions",
                    "RightName": "撤稿",
                    "RightOrder": 1,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2092,
                    "ModeID": 1123,
                    "RightID": 2,
                    "RightCode": "View",
                    "RightName": "查看",
                    "RightOrder": 2,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2094,
                    "ModeID": 1123,
                    "RightID": 4,
                    "RightCode": "Edit",
                    "RightName": "编辑",
                    "RightOrder": 4,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2095,
                    "ModeID": 1123,
                    "RightID": 5,
                    "RightCode": "Delete",
                    "RightName": "删除",
                    "RightOrder": 5,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2096,
                    "ModeID": 1123,
                    "RightID": 6,
                    "RightCode": "Audit",
                    "RightName": "审核",
                    "RightOrder": 6,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2097,
                    "ModeID": 1123,
                    "RightID": 7,
                    "RightCode": "Release",
                    "RightName": "发布",
                    "RightOrder": 7,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2099,
                    "ModeID": 1123,
                    "RightID": 9,
                    "RightCode": "Write",
                    "RightName": "写稿",
                    "RightOrder": 9,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2100,
                    "ModeID": 1123,
                    "RightID": 10,
                    "RightCode": "BatchReview",
                    "RightName": "批量审核",
                    "RightOrder": 10,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2091,
                    "ModeID": 1123,
                    "RightID": 1,
                    "RightCode": "Visit",
                    "RightName": "访问",
                    "RightOrder": 11,
                    "IsSelected": false
                  }
                ],
                "ModeID": 1123,
                "ModeName": "编",
                "ModeCode": "Edit",
                "ParentID": 108,
                "Level": 2,
                "ModeUrl": "",
                "IsPage": true,
                "IsSelected": false,
                "ModeLevelOrder": 2
              },
              {
                "ChildList": [
                  {
                    "ChildList": [],
                    "OperateList": [
                      {
                        "ModelRightID": 2244,
                        "ModeID": 1115,
                        "RightID": 122,
                        "RightCode": "MyReviewAr_Return",
                        "RightName": "待审稿件/撤回",
                        "RightOrder": 101,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2245,
                        "ModeID": 1115,
                        "RightID": 123,
                        "RightCode": "MyReviewAr_Record",
                        "RightName": "待审稿件/审核记录",
                        "RightOrder": 102,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2246,
                        "ModeID": 1115,
                        "RightID": 124,
                        "RightCode": "MyReviewAr_Update",
                        "RightName": "待审稿件/重新编辑",
                        "RightOrder": 103,
                        "IsSelected": false
                      }
                    ],
                    "ModeID": 1115,
                    "ModeName": "待审稿件",
                    "ModeCode": "auditPending",
                    "ParentID": 1124,
                    "Level": 3,
                    "ModeUrl": "/editorialCenter/auditing/auditPending",
                    "IsPage": true,
                    "IsSelected": false,
                    "ModeLevelOrder": 1
                  },
                  {
                    "ChildList": [],
                    "OperateList": [
                      {
                        "ModelRightID": 2056,
                        "ModeID": 1114,
                        "RightID": 8,
                        "RightCode": "Retractions",
                        "RightName": "撤稿",
                        "RightOrder": 1,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2050,
                        "ModeID": 1114,
                        "RightID": 2,
                        "RightCode": "View",
                        "RightName": "查看",
                        "RightOrder": 2,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2051,
                        "ModeID": 1114,
                        "RightID": 3,
                        "RightCode": "Create",
                        "RightName": "新增",
                        "RightOrder": 3,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2052,
                        "ModeID": 1114,
                        "RightID": 4,
                        "RightCode": "Edit",
                        "RightName": "编辑",
                        "RightOrder": 4,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2053,
                        "ModeID": 1114,
                        "RightID": 5,
                        "RightCode": "Delete",
                        "RightName": "删除",
                        "RightOrder": 5,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2054,
                        "ModeID": 1114,
                        "RightID": 6,
                        "RightCode": "Audit",
                        "RightName": "审核",
                        "RightOrder": 6,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2055,
                        "ModeID": 1114,
                        "RightID": 7,
                        "RightCode": "Release",
                        "RightName": "发布",
                        "RightOrder": 7,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2057,
                        "ModeID": 1114,
                        "RightID": 9,
                        "RightCode": "Write",
                        "RightName": "写稿",
                        "RightOrder": 9,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2058,
                        "ModeID": 1114,
                        "RightID": 10,
                        "RightCode": "BatchReview",
                        "RightName": "批量审核",
                        "RightOrder": 10,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2049,
                        "ModeID": 1114,
                        "RightID": 1,
                        "RightCode": "Visit",
                        "RightName": "访问",
                        "RightOrder": 11,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2206,
                        "ModeID": 1114,
                        "RightID": 117,
                        "RightCode": "ReviewAr_Sy",
                        "RightName": "本级审核/签发",
                        "RightOrder": 96,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2207,
                        "ModeID": 1114,
                        "RightID": 118,
                        "RightCode": "ReviewAr_PassSy",
                        "RightName": "本级审核/审核通过由编辑签发",
                        "RightOrder": 97,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2208,
                        "ModeID": 1114,
                        "RightID": 119,
                        "RightCode": "ReviewAr_Send",
                        "RightName": "本级审核/送审",
                        "RightOrder": 98,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2209,
                        "ModeID": 1114,
                        "RightID": 120,
                        "RightCode": "ReviewAr_Return",
                        "RightName": "本级审核/退回",
                        "RightOrder": 99,
                        "IsSelected": false
                      },
                      {
                        "ModelRightID": 2210,
                        "ModeID": 1114,
                        "RightID": 121,
                        "RightCode": "ReviewAr_ProcRecord",
                        "RightName": "本级审核/审核记录",
                        "RightOrder": 100,
                        "IsSelected": false
                      }
                    ],
                    "ModeID": 1114,
                    "ModeName": "本级审核",
                    "ModeCode": "auditLevel",
                    "ParentID": 1124,
                    "Level": 3,
                    "ModeUrl": "/editorialCenter/auditing/auditLevel",
                    "IsPage": true,
                    "IsSelected": false,
                    "ModeLevelOrder": 2
                  }
                ],
                "OperateList": [
                  {
                    "ModelRightID": 2108,
                    "ModeID": 1124,
                    "RightID": 8,
                    "RightCode": "Retractions",
                    "RightName": "撤稿",
                    "RightOrder": 1,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2102,
                    "ModeID": 1124,
                    "RightID": 2,
                    "RightCode": "View",
                    "RightName": "查看",
                    "RightOrder": 2,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2103,
                    "ModeID": 1124,
                    "RightID": 3,
                    "RightCode": "Create",
                    "RightName": "新增",
                    "RightOrder": 3,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2104,
                    "ModeID": 1124,
                    "RightID": 4,
                    "RightCode": "Edit",
                    "RightName": "编辑",
                    "RightOrder": 4,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2105,
                    "ModeID": 1124,
                    "RightID": 5,
                    "RightCode": "Delete",
                    "RightName": "删除",
                    "RightOrder": 5,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2106,
                    "ModeID": 1124,
                    "RightID": 6,
                    "RightCode": "Audit",
                    "RightName": "审核",
                    "RightOrder": 6,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2107,
                    "ModeID": 1124,
                    "RightID": 7,
                    "RightCode": "Release",
                    "RightName": "发布",
                    "RightOrder": 7,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2109,
                    "ModeID": 1124,
                    "RightID": 9,
                    "RightCode": "Write",
                    "RightName": "写稿",
                    "RightOrder": 9,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2110,
                    "ModeID": 1124,
                    "RightID": 10,
                    "RightCode": "BatchReview",
                    "RightName": "批量审核",
                    "RightOrder": 10,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2101,
                    "ModeID": 1124,
                    "RightID": 1,
                    "RightCode": "Visit",
                    "RightName": "访问",
                    "RightOrder": 11,
                    "IsSelected": false
                  }
                ],
                "ModeID": 1124,
                "ModeName": "审",
                "ModeCode": "Auditing",
                "ParentID": 108,
                "Level": 2,
                "ModeUrl": "",
                "IsPage": true,
                "IsSelected": false,
                "ModeLevelOrder": 3
              }
            ],
            "OperateList": [
              {
                "ModelRightID": 983,
                "ModeID": 108,
                "RightID": 8,
                "RightCode": "Retractions",
                "RightName": "撤稿",
                "RightOrder": 1,
                "IsSelected": false
              },
              {
                "ModelRightID": 977,
                "ModeID": 108,
                "RightID": 2,
                "RightCode": "View",
                "RightName": "查看",
                "RightOrder": 2,
                "IsSelected": false
              },
              {
                "ModelRightID": 978,
                "ModeID": 108,
                "RightID": 3,
                "RightCode": "Create",
                "RightName": "新增",
                "RightOrder": 3,
                "IsSelected": false
              },
              {
                "ModelRightID": 979,
                "ModeID": 108,
                "RightID": 4,
                "RightCode": "Edit",
                "RightName": "编辑",
                "RightOrder": 4,
                "IsSelected": false
              },
              {
                "ModelRightID": 980,
                "ModeID": 108,
                "RightID": 5,
                "RightCode": "Delete",
                "RightName": "删除",
                "RightOrder": 5,
                "IsSelected": false
              },
              {
                "ModelRightID": 981,
                "ModeID": 108,
                "RightID": 6,
                "RightCode": "Audit",
                "RightName": "审核",
                "RightOrder": 6,
                "IsSelected": false
              },
              {
                "ModelRightID": 982,
                "ModeID": 108,
                "RightID": 7,
                "RightCode": "Release",
                "RightName": "发布",
                "RightOrder": 7,
                "IsSelected": false
              },
              {
                "ModelRightID": 984,
                "ModeID": 108,
                "RightID": 9,
                "RightCode": "Write",
                "RightName": "写稿",
                "RightOrder": 9,
                "IsSelected": false
              },
              {
                "ModelRightID": 985,
                "ModeID": 108,
                "RightID": 10,
                "RightCode": "BatchReview",
                "RightName": "批量审核",
                "RightOrder": 10,
                "IsSelected": false
              },
              {
                "ModelRightID": 976,
                "ModeID": 108,
                "RightID": 1,
                "RightCode": "Visit",
                "RightName": "访问",
                "RightOrder": 11,
                "IsSelected": false
              }
            ],
            "ModeID": 108,
            "ModeName": "采编中心",
            "ModeCode": "editorialCenter",
            "ParentID": 0,
            "Level": 1,
            "ModeUrl": "/editorialCenter",
            "IsPage": true,
            "IsSelected": false,
            "ModeLevelOrder": 1
          },
          {
            "ChildList": [
              {
                "ChildList": [],
                "OperateList": [
                  {
                    "ModelRightID": 2143,
                    "ModeID": 37,
                    "RightID": 2,
                    "RightCode": "View",
                    "RightName": "查看",
                    "RightOrder": 2,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2142,
                    "ModeID": 37,
                    "RightID": 1,
                    "RightCode": "Visit",
                    "RightName": "访问",
                    "RightOrder": 11,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2141,
                    "ModeID": 37,
                    "RightID": 169,
                    "RightCode": "MyJoinTask_Add",
                    "RightName": "参与任务/发布任务",
                    "RightOrder": 148,
                    "IsSelected": false
                  }
                ],
                "ModeID": 37,
                "ModeName": "参与任务",
                "ModeCode": "participation",
                "ParentID": 2,
                "Level": 2,
                "ModeUrl": "/pressHall/participation",
                "IsPage": true,
                "IsSelected": false,
                "ModeLevelOrder": 1
              },
              {
                "ChildList": [],
                "OperateList": [
                  {
                    "ModelRightID": 212,
                    "ModeID": 36,
                    "RightID": 2,
                    "RightCode": "View",
                    "RightName": "查看",
                    "RightOrder": 2,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 211,
                    "ModeID": 36,
                    "RightID": 1,
                    "RightCode": "Visit",
                    "RightName": "访问",
                    "RightOrder": 11,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2146,
                    "ModeID": 36,
                    "RightID": 166,
                    "RightCode": "publishTask_Add",
                    "RightName": "已发任务/发布任务",
                    "RightOrder": 145,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2145,
                    "ModeID": 36,
                    "RightID": 167,
                    "RightCode": "publishTask_Close",
                    "RightName": "已发任务/关闭任务",
                    "RightOrder": 146,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2144,
                    "ModeID": 36,
                    "RightID": 168,
                    "RightCode": "publishTask_Detail",
                    "RightName": "已发任务/参与详情",
                    "RightOrder": 147,
                    "IsSelected": false
                  }
                ],
                "ModeID": 36,
                "ModeName": "已发任务",
                "ModeCode": "publish",
                "ParentID": 2,
                "Level": 2,
                "ModeUrl": "/pressHall/publish",
                "IsPage": true,
                "IsSelected": false,
                "ModeLevelOrder": 2
              },
              {
                "ChildList": [],
                "OperateList": [
                  {
                    "ModelRightID": 214,
                    "ModeID": 35,
                    "RightID": 2,
                    "RightCode": "View",
                    "RightName": "查看",
                    "RightOrder": 2,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 213,
                    "ModeID": 35,
                    "RightID": 1,
                    "RightCode": "Visit",
                    "RightName": "访问",
                    "RightOrder": 11,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2151,
                    "ModeID": 35,
                    "RightID": 164,
                    "RightCode": "task_Add",
                    "RightName": "任务中心/发布任务",
                    "RightOrder": 143,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2152,
                    "ModeID": 35,
                    "RightID": 165,
                    "RightCode": "task_Join",
                    "RightName": "任务中心/立即参与",
                    "RightOrder": 144,
                    "IsSelected": false
                  }
                ],
                "ModeID": 35,
                "ModeName": "任务中心",
                "ModeCode": "task",
                "ParentID": 2,
                "Level": 2,
                "ModeUrl": "/pressHall/task",
                "IsPage": true,
                "IsSelected": false,
                "ModeLevelOrder": 3
              }
            ],
            "OperateList": [
              {
                "ModelRightID": 245,
                "ModeID": 2,
                "RightID": 2,
                "RightCode": "View",
                "RightName": "查看",
                "RightOrder": 2,
                "IsSelected": false
              },
              {
                "ModelRightID": 244,
                "ModeID": 2,
                "RightID": 1,
                "RightCode": "Visit",
                "RightName": "访问",
                "RightOrder": 11,
                "IsSelected": false
              }
            ],
            "ModeID": 2,
            "ModeName": "传播大厅",
            "ModeCode": "pressHall",
            "ParentID": 0,
            "Level": 1,
            "ModeUrl": "/pressHall",
            "IsPage": true,
            "IsSelected": false,
            "ModeLevelOrder": 4
          },
          {
            "ChildList": [],
            "OperateList": [
              {
                "ModelRightID": 237,
                "ModeID": 5,
                "RightID": 2,
                "RightCode": "View",
                "RightName": "查看",
                "RightOrder": 2,
                "IsSelected": false
              },
              {
                "ModelRightID": 238,
                "ModeID": 5,
                "RightID": 3,
                "RightCode": "Create",
                "RightName": "新增",
                "RightOrder": 3,
                "IsSelected": false
              },
              {
                "ModelRightID": 246,
                "ModeID": 5,
                "RightID": 1,
                "RightCode": "Visit",
                "RightName": "访问",
                "RightOrder": 11,
                "IsSelected": false
              }
            ],
            "ModeID": 5,
            "ModeName": "应用中心",
            "ModeCode": "applicationCenter",
            "ParentID": 0,
            "Level": 1,
            "ModeUrl": "/applicationCenter",
            "IsPage": false,
            "IsSelected": false,
            "ModeLevelOrder": 5
          },
          {
            "ChildList": [
              {
                "ChildList": [],
                "OperateList": [
                  {
                    "ModelRightID": 218,
                    "ModeID": 32,
                    "RightID": 2,
                    "RightCode": "View",
                    "RightName": "查看",
                    "RightOrder": 2,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 217,
                    "ModeID": 32,
                    "RightID": 1,
                    "RightCode": "Visit",
                    "RightName": "访问",
                    "RightOrder": 11,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2195,
                    "ModeID": 32,
                    "RightID": 99,
                    "RightCode": "AllArticle_Set",
                    "RightName": "全部稿件/修改",
                    "RightOrder": 78,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2196,
                    "ModeID": 32,
                    "RightID": 100,
                    "RightCode": "AllArticle_BatchSy",
                    "RightName": "全部稿件/一键下发",
                    "RightOrder": 79,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2197,
                    "ModeID": 32,
                    "RightID": 101,
                    "RightCode": "AllArticle_BatchDel",
                    "RightName": "全部稿件/一键删稿",
                    "RightOrder": 80,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2198,
                    "ModeID": 32,
                    "RightID": 102,
                    "RightCode": "AllArticle_Detail",
                    "RightName": "全部稿件/传播轨迹",
                    "RightOrder": 81,
                    "IsSelected": false
                  }
                ],
                "ModeID": 32,
                "ModeName": "全部稿件",
                "ModeCode": "content",
                "ParentID": 16,
                "Level": 2,
                "ModeUrl": "/monitor/content",
                "IsPage": true,
                "IsSelected": false,
                "ModeLevelOrder": 1
              },
              {
                "ChildList": [],
                "OperateList": [
                  {
                    "ModelRightID": 285,
                    "ModeID": 33,
                    "RightID": 2,
                    "RightCode": "View",
                    "RightName": "查看",
                    "RightOrder": 2,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 286,
                    "ModeID": 33,
                    "RightID": 3,
                    "RightCode": "Create",
                    "RightName": "新增",
                    "RightOrder": 3,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 287,
                    "ModeID": 33,
                    "RightID": 4,
                    "RightCode": "Edit",
                    "RightName": "编辑",
                    "RightOrder": 4,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 288,
                    "ModeID": 33,
                    "RightID": 5,
                    "RightCode": "Delete",
                    "RightName": "删除",
                    "RightOrder": 5,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 289,
                    "ModeID": 33,
                    "RightID": 6,
                    "RightCode": "Audit",
                    "RightName": "审核",
                    "RightOrder": 6,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 290,
                    "ModeID": 33,
                    "RightID": 7,
                    "RightCode": "Release",
                    "RightName": "发布",
                    "RightOrder": 7,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 304,
                    "ModeID": 33,
                    "RightID": 1,
                    "RightCode": "Visit",
                    "RightName": "访问",
                    "RightOrder": 11,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2200,
                    "ModeID": 33,
                    "RightID": 103,
                    "RightCode": "DownRecord_detail",
                    "RightName": "下发历史/查看明细",
                    "RightOrder": 82,
                    "IsSelected": false
                  }
                ],
                "ModeID": 33,
                "ModeName": "下发历史",
                "ModeCode": "issuedTask",
                "ParentID": 16,
                "Level": 2,
                "ModeUrl": "/monitor/issuedTask",
                "IsPage": true,
                "IsSelected": false,
                "ModeLevelOrder": 2
              },
              {
                "ChildList": [],
                "OperateList": [
                  {
                    "ModelRightID": 216,
                    "ModeID": 34,
                    "RightID": 2,
                    "RightCode": "View",
                    "RightName": "查看",
                    "RightOrder": 2,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 215,
                    "ModeID": 34,
                    "RightID": 1,
                    "RightCode": "Visit",
                    "RightName": "访问",
                    "RightOrder": 11,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2201,
                    "ModeID": 34,
                    "RightID": 104,
                    "RightCode": "DelRecord_detail",
                    "RightName": "删稿记录/查看明细",
                    "RightOrder": 83,
                    "IsSelected": false
                  }
                ],
                "ModeID": 34,
                "ModeName": "删稿记录",
                "ModeCode": "deleteRecord",
                "ParentID": 16,
                "Level": 2,
                "ModeUrl": "/monitor/deleteRecord",
                "IsPage": true,
                "IsSelected": false,
                "ModeLevelOrder": 3
              },
              {
                "ChildList": [],
                "OperateList": [
                  {
                    "ModelRightID": 794,
                    "ModeID": 57,
                    "RightID": 8,
                    "RightCode": "Retractions",
                    "RightName": "撤稿",
                    "RightOrder": 1,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 788,
                    "ModeID": 57,
                    "RightID": 2,
                    "RightCode": "View",
                    "RightName": "查看",
                    "RightOrder": 2,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 789,
                    "ModeID": 57,
                    "RightID": 3,
                    "RightCode": "Create",
                    "RightName": "新增",
                    "RightOrder": 3,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 790,
                    "ModeID": 57,
                    "RightID": 4,
                    "RightCode": "Edit",
                    "RightName": "编辑",
                    "RightOrder": 4,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 791,
                    "ModeID": 57,
                    "RightID": 5,
                    "RightCode": "Delete",
                    "RightName": "删除",
                    "RightOrder": 5,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 792,
                    "ModeID": 57,
                    "RightID": 6,
                    "RightCode": "Audit",
                    "RightName": "审核",
                    "RightOrder": 6,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 793,
                    "ModeID": 57,
                    "RightID": 7,
                    "RightCode": "Release",
                    "RightName": "发布",
                    "RightOrder": 7,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 795,
                    "ModeID": 57,
                    "RightID": 9,
                    "RightCode": "Write",
                    "RightName": "写稿",
                    "RightOrder": 9,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 796,
                    "ModeID": 57,
                    "RightID": 10,
                    "RightCode": "BatchReview",
                    "RightName": "批量审核",
                    "RightOrder": 10,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 787,
                    "ModeID": 57,
                    "RightID": 1,
                    "RightCode": "Visit",
                    "RightName": "访问",
                    "RightOrder": 11,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2202,
                    "ModeID": 57,
                    "RightID": 107,
                    "RightCode": "ReviewArticle_Review",
                    "RightName": "平台审核/审核",
                    "RightOrder": 86,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2203,
                    "ModeID": 57,
                    "RightID": 171,
                    "RightCode": "ReviewArticles_Set",
                    "RightName": "平台审核/审核设置",
                    "RightOrder": 150,
                    "IsSelected": false
                  }
                ],
                "ModeID": 57,
                "ModeName": "平台审核",
                "ModeCode": "reviewManuscript",
                "ParentID": 16,
                "Level": 2,
                "ModeUrl": "/monitor/reviewManuscript",
                "IsPage": true,
                "IsSelected": false,
                "ModeLevelOrder": 4
              },
              {
                "ChildList": [],
                "OperateList": [
                  {
                    "ModelRightID": 319,
                    "ModeID": 63,
                    "RightID": 2,
                    "RightCode": "View",
                    "RightName": "查看",
                    "RightOrder": 2,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 318,
                    "ModeID": 63,
                    "RightID": 1,
                    "RightCode": "Visit",
                    "RightName": "访问",
                    "RightOrder": 11,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2205,
                    "ModeID": 63,
                    "RightID": 105,
                    "RightCode": "ArticleTask_detail",
                    "RightName": "任务监管/参与详情",
                    "RightOrder": 84,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2204,
                    "ModeID": 63,
                    "RightID": 106,
                    "RightCode": "ArticleTask_OffJoin",
                    "RightName": "任务监管/下线任务",
                    "RightOrder": 85,
                    "IsSelected": false
                  }
                ],
                "ModeID": 63,
                "ModeName": "任务监管",
                "ModeCode": "taskCenter",
                "ParentID": 16,
                "Level": 2,
                "ModeUrl": "/monitor/taskCenter",
                "IsPage": true,
                "IsSelected": false,
                "ModeLevelOrder": 6
              }
            ],
            "OperateList": [
              {
                "ModelRightID": 228,
                "ModeID": 16,
                "RightID": 2,
                "RightCode": "View",
                "RightName": "查看",
                "RightOrder": 2,
                "IsSelected": false
              },
              {
                "ModelRightID": 227,
                "ModeID": 16,
                "RightID": 1,
                "RightCode": "Visit",
                "RightName": "访问",
                "RightOrder": 11,
                "IsSelected": false
              }
            ],
            "ModeID": 16,
            "ModeName": "新闻管理",
            "ModeCode": "monitor",
            "ParentID": 0,
            "Level": 1,
            "ModeUrl": "/monitor",
            "IsPage": true,
            "IsSelected": false,
            "ModeLevelOrder": 7
          },
          {
            "ChildList": [
              {
                "ChildList": [],
                "OperateList": [
                  {
                    "ModelRightID": 887,
                    "ModeID": 95,
                    "RightID": 4,
                    "RightCode": "Edit",
                    "RightName": "编辑",
                    "RightOrder": 4,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 892,
                    "ModeID": 95,
                    "RightID": 9,
                    "RightCode": "Write",
                    "RightName": "写稿",
                    "RightOrder": 9,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 884,
                    "ModeID": 95,
                    "RightID": 1,
                    "RightCode": "Visit",
                    "RightName": "访问",
                    "RightOrder": 11,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2273,
                    "ModeID": 95,
                    "RightID": 33,
                    "RightCode": "Center_Synchronized",
                    "RightName": "稿件中心/同步",
                    "RightOrder": 12,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2274,
                    "ModeID": 95,
                    "RightID": 34,
                    "RightCode": "Center_reference",
                    "RightName": "稿件中心/传播轨迹",
                    "RightOrder": 13,
                    "IsSelected": false
                  }
                ],
                "ModeID": 95,
                "ModeName": "稿件中心",
                "ModeCode": "mediaStoryCenter",
                "ParentID": 87,
                "Level": 2,
                "ModeUrl": "/mediaSrcCenter/mediaStoryCenter",
                "IsPage": true,
                "IsSelected": false,
                "ModeLevelOrder": 1
              },
              {
                "ChildList": [],
                "OperateList": [
                  {
                    "ModelRightID": 821,
                    "ModeID": 88,
                    "RightID": 4,
                    "RightCode": "Edit",
                    "RightName": "编辑",
                    "RightOrder": 4,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 826,
                    "ModeID": 88,
                    "RightID": 9,
                    "RightCode": "Write",
                    "RightName": "写稿",
                    "RightOrder": 9,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 818,
                    "ModeID": 88,
                    "RightID": 1,
                    "RightCode": "Visit",
                    "RightName": "访问",
                    "RightOrder": 11,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2275,
                    "ModeID": 88,
                    "RightID": 35,
                    "RightCode": "WechatList_Detail",
                    "RightName": "微信数据/查看",
                    "RightOrder": 14,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2276,
                    "ModeID": 88,
                    "RightID": 36,
                    "RightCode": "WechatList_Follow",
                    "RightName": "微信数据/关注",
                    "RightOrder": 15,
                    "IsSelected": false
                  }
                ],
                "ModeID": 88,
                "ModeName": "微信数据",
                "ModeCode": "mediaSrcWechatList",
                "ParentID": 87,
                "Level": 2,
                "ModeUrl": "/mediaSrcCenter/mediaSrcWechatList",
                "IsPage": true,
                "IsSelected": false,
                "ModeLevelOrder": 2
              },
              {
                "ChildList": [],
                "OperateList": [
                  {
                    "ModelRightID": 831,
                    "ModeID": 89,
                    "RightID": 4,
                    "RightCode": "Edit",
                    "RightName": "编辑",
                    "RightOrder": 4,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 828,
                    "ModeID": 89,
                    "RightID": 1,
                    "RightCode": "Visit",
                    "RightName": "访问",
                    "RightOrder": 11,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2278,
                    "ModeID": 89,
                    "RightID": 37,
                    "RightCode": "WeiboList_Detail",
                    "RightName": "微博数据/查看",
                    "RightOrder": 16,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2277,
                    "ModeID": 89,
                    "RightID": 38,
                    "RightCode": "WeiboList_Follow",
                    "RightName": "微博数据/关注",
                    "RightOrder": 17,
                    "IsSelected": false
                  }
                ],
                "ModeID": 89,
                "ModeName": "微博数据",
                "ModeCode": "mediaSrcWeiboList",
                "ParentID": 87,
                "Level": 2,
                "ModeUrl": "/mediaSrcCenter/mediaSrcWeiboList",
                "IsPage": true,
                "IsSelected": false,
                "ModeLevelOrder": 3
              },
              {
                "ChildList": [],
                "OperateList": [
                  {
                    "ModelRightID": 835,
                    "ModeID": 90,
                    "RightID": 4,
                    "RightCode": "Edit",
                    "RightName": "编辑",
                    "RightOrder": 4,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 840,
                    "ModeID": 90,
                    "RightID": 9,
                    "RightCode": "Write",
                    "RightName": "写稿",
                    "RightOrder": 9,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 832,
                    "ModeID": 90,
                    "RightID": 1,
                    "RightCode": "Visit",
                    "RightName": "访问",
                    "RightOrder": 11,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2279,
                    "ModeID": 90,
                    "RightID": 39,
                    "RightCode": "SrcFollow_Unfollow",
                    "RightName": "关注内容/取消关注",
                    "RightOrder": 18,
                    "IsSelected": false
                  }
                ],
                "ModeID": 90,
                "ModeName": "关注内容",
                "ModeCode": "mediaSrcFollow",
                "ParentID": 87,
                "Level": 2,
                "ModeUrl": "/mediaSrcCenter/mediaSrcFollow",
                "IsPage": true,
                "IsSelected": false,
                "ModeLevelOrder": 4
              },
              {
                "ChildList": [],
                "OperateList": [
                  {
                    "ModelRightID": 845,
                    "ModeID": 91,
                    "RightID": 4,
                    "RightCode": "Edit",
                    "RightName": "编辑",
                    "RightOrder": 4,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 850,
                    "ModeID": 91,
                    "RightID": 9,
                    "RightCode": "Write",
                    "RightName": "写稿",
                    "RightOrder": 9,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 842,
                    "ModeID": 91,
                    "RightID": 1,
                    "RightCode": "Visit",
                    "RightName": "访问",
                    "RightOrder": 11,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2280,
                    "ModeID": 91,
                    "RightID": 40,
                    "RightCode": "Collect_CollectInDB",
                    "RightName": "收藏内容/入库",
                    "RightOrder": 19,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2281,
                    "ModeID": 91,
                    "RightID": 41,
                    "RightCode": "Collect_Uncollect",
                    "RightName": "收藏内容/取消收藏",
                    "RightOrder": 20,
                    "IsSelected": false
                  }
                ],
                "ModeID": 91,
                "ModeName": "收藏内容",
                "ModeCode": "mediaSrcCollect",
                "ParentID": 87,
                "Level": 2,
                "ModeUrl": "/mediaSrcCenter/mediaSrcCollect",
                "IsPage": true,
                "IsSelected": false,
                "ModeLevelOrder": 5
              },
              {
                "ChildList": [],
                "OperateList": [
                  {
                    "ModelRightID": 865,
                    "ModeID": 93,
                    "RightID": 4,
                    "RightCode": "Edit",
                    "RightName": "编辑",
                    "RightOrder": 4,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 863,
                    "ModeID": 93,
                    "RightID": 1,
                    "RightCode": "Visit",
                    "RightName": "访问",
                    "RightOrder": 11,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2284,
                    "ModeID": 93,
                    "RightID": 42,
                    "RightCode": "dataCrawl_Create",
                    "RightName": "数据抓取/新建数据源",
                    "RightOrder": 21,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2282,
                    "ModeID": 93,
                    "RightID": 43,
                    "RightCode": "dataCrawl_Update",
                    "RightName": "数据抓取/编辑",
                    "RightOrder": 22,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2283,
                    "ModeID": 93,
                    "RightID": 44,
                    "RightCode": "dataCrawl_Change",
                    "RightName": "数据抓取/禁用",
                    "RightOrder": 23,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2285,
                    "ModeID": 93,
                    "RightID": 45,
                    "RightCode": "dataCrawl_Delete",
                    "RightName": "数据抓取/删除",
                    "RightOrder": 24,
                    "IsSelected": false
                  }
                ],
                "ModeID": 93,
                "ModeName": "数据抓取",
                "ModeCode": "dataCrawl",
                "ParentID": 87,
                "Level": 2,
                "ModeUrl": "/mediaSrcCenter/dataCrawl",
                "IsPage": true,
                "IsSelected": false,
                "ModeLevelOrder": 6
              }
            ],
            "OperateList": [
              {
                "ModelRightID": 883,
                "ModeID": 87,
                "RightID": 2,
                "RightCode": "View",
                "RightName": "查看",
                "RightOrder": 2,
                "IsSelected": false
              },
              {
                "ModelRightID": 882,
                "ModeID": 87,
                "RightID": 1,
                "RightCode": "Visit",
                "RightName": "访问",
                "RightOrder": 11,
                "IsSelected": false
              }
            ],
            "ModeID": 87,
            "ModeName": "大数据",
            "ModeCode": "mediaSrcCenter",
            "ParentID": 0,
            "Level": 1,
            "ModeUrl": "/mediaSrcCenter",
            "IsPage": true,
            "IsSelected": false,
            "ModeLevelOrder": 13
          },
          {
            "ChildList": [
              {
                "ChildList": [],
                "OperateList": [
                  {
                    "ModelRightID": 274,
                    "ModeID": 54,
                    "RightID": 3,
                    "RightCode": "Create",
                    "RightName": "新增",
                    "RightOrder": 3,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 273,
                    "ModeID": 54,
                    "RightID": 1,
                    "RightCode": "Visit",
                    "RightName": "访问",
                    "RightOrder": 11,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2153,
                    "ModeID": 54,
                    "RightID": 162,
                    "RightCode": "Orgs_SaveImage",
                    "RightName": "机构设置/稿件图片设置",
                    "RightOrder": 141,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2154,
                    "ModeID": 54,
                    "RightID": 163,
                    "RightCode": "Orgs_AuditConfig",
                    "RightName": "机构设置/稿件审核设置",
                    "RightOrder": 142,
                    "IsSelected": false
                  }
                ],
                "ModeID": 54,
                "ModeName": "机构设置",
                "ModeCode": "orgSettings",
                "ParentID": 96,
                "Level": 2,
                "ModeUrl": "/orgControl/orgSettings",
                "IsPage": true,
                "IsSelected": false,
                "ModeLevelOrder": 3
              },
              {
                "ChildList": [],
                "OperateList": [
                  {
                    "ModelRightID": 2340,
                    "ModeID": 51,
                    "RightID": 186,
                    "RightCode": "RoleStaff_View",
                    "RightName": "成员管理/机构管理员",
                    "RightOrder": 1,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2341,
                    "ModeID": 51,
                    "RightID": 187,
                    "RightCode": "ChildOrgs_View",
                    "RightName": "成员管理/管理机构列表",
                    "RightOrder": 1,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 5358,
                    "ModeID": 51,
                    "RightID": 1194,
                    "RightCode": "RoleStaff_AppAccountManage",
                    "RightName": "成员管理/管理媒体",
                    "RightOrder": 1,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 262,
                    "ModeID": 51,
                    "RightID": 1,
                    "RightCode": "Visit",
                    "RightName": "访问",
                    "RightOrder": 11,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2170,
                    "ModeID": 51,
                    "RightID": 145,
                    "RightCode": "RoleStaff_Rename",
                    "RightName": "成员管理/重命名",
                    "RightOrder": 124,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2171,
                    "ModeID": 51,
                    "RightID": 146,
                    "RightCode": "RoleStaff_Set",
                    "RightName": "成员管理/权限设置",
                    "RightOrder": 125,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2172,
                    "ModeID": 51,
                    "RightID": 147,
                    "RightCode": "RoleStaff_Delete",
                    "RightName": "成员管理/删除角色",
                    "RightOrder": 126,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2173,
                    "ModeID": 51,
                    "RightID": 148,
                    "RightCode": "RoleStaff_Update",
                    "RightName": "成员管理/编辑",
                    "RightOrder": 127,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2174,
                    "ModeID": 51,
                    "RightID": 149,
                    "RightCode": "RoleStaff_Stop",
                    "RightName": "成员管理/禁用",
                    "RightOrder": 128,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2175,
                    "ModeID": 51,
                    "RightID": 150,
                    "RightCode": "RoleStaff_RePassword",
                    "RightName": "成员管理/重置密码",
                    "RightOrder": 129,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2176,
                    "ModeID": 51,
                    "RightID": 151,
                    "RightCode": "RoleStaff_OrgManage",
                    "RightName": "成员管理/管理机构",
                    "RightOrder": 130,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2177,
                    "ModeID": 51,
                    "RightID": 152,
                    "RightCode": "RoleStaff_AddRole",
                    "RightName": "成员管理/添加角色",
                    "RightOrder": 131,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2169,
                    "ModeID": 51,
                    "RightID": 153,
                    "RightCode": "RoleStaff_AddAccount",
                    "RightName": "成员管理/添加成员",
                    "RightOrder": 132,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2178,
                    "ModeID": 51,
                    "RightID": 154,
                    "RightCode": "ChildOrgs_Add",
                    "RightName": "管理机构列表/新建机构",
                    "RightOrder": 133,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2179,
                    "ModeID": 51,
                    "RightID": 155,
                    "RightCode": "ChildOrgs_Import",
                    "RightName": "管理机构列表/批量导入",
                    "RightOrder": 134,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2180,
                    "ModeID": 51,
                    "RightID": 156,
                    "RightCode": "ChildOrgs_Stop",
                    "RightName": "管理机构列表/禁用",
                    "RightOrder": 135,
                    "IsSelected": false
                  }
                ],
                "ModeID": 51,
                "ModeName": "成员管理",
                "ModeCode": "permission",
                "ParentID": 96,
                "Level": 2,
                "ModeUrl": "/orgControl/permission",
                "IsPage": true,
                "IsSelected": false,
                "ModeLevelOrder": 4
              },
              {
                "ChildList": [],
                "OperateList": [
                  {
                    "ModelRightID": 2342,
                    "ModeID": 53,
                    "RightID": 188,
                    "RightCode": "XiangZhengRongUrl",
                    "RightName": "乡镇融网站地址",
                    "RightOrder": 1,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 5356,
                    "ModeID": 53,
                    "RightID": 1192,
                    "RightCode": "Media_EditNickname",
                    "RightName": "媒体管理/编辑名称",
                    "RightOrder": 1,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 269,
                    "ModeID": 53,
                    "RightID": 1,
                    "RightCode": "Visit",
                    "RightName": "访问",
                    "RightOrder": 11,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2165,
                    "ModeID": 53,
                    "RightID": 157,
                    "RightCode": "Media_UpdateTag",
                    "RightName": "媒体管理/编辑标签",
                    "RightOrder": 136,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2166,
                    "ModeID": 53,
                    "RightID": 158,
                    "RightCode": "Media_UpdateManage",
                    "RightName": "媒体管理/管理运营人",
                    "RightOrder": 137,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2167,
                    "ModeID": 53,
                    "RightID": 159,
                    "RightCode": "Media_UnBind",
                    "RightName": "媒体管理/解除授权",
                    "RightOrder": 138,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2168,
                    "ModeID": 53,
                    "RightID": 160,
                    "RightCode": "Media_Content",
                    "RightName": "媒体管理/管理内容",
                    "RightOrder": 139,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2199,
                    "ModeID": 53,
                    "RightID": 161,
                    "RightCode": "Media_Add",
                    "RightName": "媒体管理/添加媒体",
                    "RightOrder": 140,
                    "IsSelected": false
                  }
                ],
                "ModeID": 53,
                "ModeName": "媒体管理",
                "ModeCode": "mediaManager",
                "ParentID": 96,
                "Level": 2,
                "ModeUrl": "/orgControl/mediaManager",
                "IsPage": true,
                "IsSelected": false,
                "ModeLevelOrder": 5
              },
              {
                "ChildList": [],
                "OperateList": [
                  {
                    "ModelRightID": 260,
                    "ModeID": 50,
                    "RightID": 2,
                    "RightCode": "View",
                    "RightName": "查看",
                    "RightOrder": 2,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 259,
                    "ModeID": 50,
                    "RightID": 1,
                    "RightCode": "Visit",
                    "RightName": "访问",
                    "RightOrder": 11,
                    "IsSelected": false
                  },
                  {
                    "ModelRightID": 2181,
                    "ModeID": 50,
                    "RightID": 144,
                    "RightCode": "LicenseOrg_Update",
                    "RightName": "资质认证/保存",
                    "RightOrder": 123,
                    "IsSelected": false
                  }
                ],
                "ModeID": 50,
                "ModeName": "资质认证",
                "ModeCode": "auth",
                "ParentID": 96,
                "Level": 2,
                "ModeUrl": "/orgControl/auth",
                "IsPage": true,
                "IsSelected": false,
                "ModeLevelOrder": 6
              }
            ],
            "OperateList": [
              {
                "ModelRightID": 895,
                "ModeID": 96,
                "RightID": 2,
                "RightCode": "View",
                "RightName": "查看",
                "RightOrder": 2,
                "IsSelected": false
              },
              {
                "ModelRightID": 898,
                "ModeID": 96,
                "RightID": 3,
                "RightCode": "Create",
                "RightName": "新增",
                "RightOrder": 3,
                "IsSelected": false
              },
              {
                "ModelRightID": 896,
                "ModeID": 96,
                "RightID": 4,
                "RightCode": "Edit",
                "RightName": "编辑",
                "RightOrder": 4,
                "IsSelected": false
              },
              {
                "ModelRightID": 897,
                "ModeID": 96,
                "RightID": 5,
                "RightCode": "Delete",
                "RightName": "删除",
                "RightOrder": 5,
                "IsSelected": false
              },
              {
                "ModelRightID": 894,
                "ModeID": 96,
                "RightID": 1,
                "RightCode": "Visit",
                "RightName": "访问",
                "RightOrder": 11,
                "IsSelected": false
              }
            ],
            "ModeID": 96,
            "ModeName": "机构中心",
            "ModeCode": "orgControl",
            "ParentID": 0,
            "Level": 1,
            "ModeUrl": "/orgControl",
            "IsPage": true,
            "IsSelected": false,
            "ModeLevelOrder": 15
          }
        ]
      };
    res.send(JSON.stringify(data));
})

app.listen(3001)