import React, { Component } from 'react'
import { getData } from '../Modules/PerformanceData'
import { Line, Pie } from 'react-chartjs-2'
import moment from 'moment'

class DisplayPerformanceData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      performanceData: null
    }
  }

  //   indexUpdated() {
  //   this.setState({ updateIndex: false })
  // }

  componentDidMount() {
    this.getPerformanceData()
  }
  async getPerformanceData() {
    let result = await getData();
    this.setState({performanceData: result.data.entries})}

  render () {
    let dataIndex;
    let distances = []
    let labels = []
    let messages = []

    if (this.props.updateIndex === true) {
      this.getPerformanceData();
    }
    if (this.state.performanceData != null) {
      this.state.performanceData.forEach(entry => {
        let dateString = entry.created_at;
        let dateObj = new Date(dateString);
        let momentObj = moment(dateObj)
        let momentString = momentObj.format('YYYY-MM-DD');
        distances.push(entry.data.distance)
        labels.push(momentString)
        messages.push(entry.data.message)
      })
      dataIndex = (
        <>
          {this.state.performanceData.map(item => {
            return <div key={item.id}>{item.data.message}</div>
          })}
        </>
      )
    }


    let line = {
      labels: labels,
      datasets: [{
        label: "My runs",
        data: distances,
        fill: false,
        lineTension: 0.1,
        borderColor: "#00cc99",
      }],
    }

    let pie = {
      labels: [
        'Excellent',
        'Above average',
        'Average',
        'Below average',
        'Poor'
      ],
      datasets: [{
        data: [
          messages.filter(item => item === "Excellent").length,
          messages.filter(item => item === "Above average").length,
          messages.filter(item => item === "Average").length,
          messages.filter(item => item === "Below average").length,
          messages.filter(item => item === "Poor").length
        ]
      }],
    }

    return (
      <>
        {dataIndex}
        <Line
          data={line}
          />
        <Pie 
          data={pie}
          />
      </>
    )
  }
}

export default DisplayPerformanceData