## Fetch - Points - Code Challenge

A web service built with Node.js and Express by Paul Jenkins [@pjenx](https://github.com/pjenx).

To run the web service: 

1. Download the project here [https://github.com/pjenx/points](https://github.com/pjenx/points).
2. From a command prompt, go to the top level of the project (.../points).
3. Enter the command "npm install" -- this will install the project's dependencies.
4. Once that's done, enter the command "npm start" -- this will start the web service. (ctrl+c to stop it)

By default, the service will be reachable at localhost on port 3000. (localhost:3000).
If necessary, the port can be changed by editing the app.js file (it's currently hard-coded).

The service makes 3 requests available:


## Add Transaction

| Method | Path         | Auth Required |
| ------ | ------------ | ------------- |
| POST   | /transaction | no            |

#### Body

json with required fields **_payer_**, **_points_**, **_timestamp_**

```json
// example
{
  "payer": "ATARI",
  "points": 400,
  "timestamp": "2020-11-02T11:00:00Z"
}
```
#### Return

Status 201 (Created)  
json with the created transaction


## Get Balances

| Method | Path            | Auth Required |
| ------ | --------------- | ------------- |
| GET    | /points/balance | no            |

#### Return

Status 200 (OK)  
json with points balances for each payer

```json
// example
{
  "DANNON": 1000,
  "UNILEVER": 0,
  "MILLER COORS": 5300
}
```


## Spend Points

| Method | Path          | Auth Required |
| ------ | ------------- | ------------- |
| POST   | /points/spend | no            |

#### Body

json with required field **_points_**

```json
// example
{
  "points": 5000
}
```
#### Return

Status 201 (Created)  
json with the points spent per payer

```json
// example
[
  { "payer": "DANNON", "points": -100 },
  { "payer": "UNILEVER", "points": -200 },
  { "payer": "MILLER COORS", "points": -4700 }
]
```