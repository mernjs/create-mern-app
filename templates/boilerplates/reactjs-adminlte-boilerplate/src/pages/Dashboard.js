import React, { Component } from 'react';
import {
  Content,
  Col,
  Row,
  Box,
  DescriptionBlock,
  ProgressGroup,
  Alert,
} from 'adminlte-2-react';
import UpperInfoBoxes from 'components/UpperInfoBoxes';

class Dashboard extends Component {
  render() {
    return (
      <Content title="Dashboard" subTitle="Version 2.0">
        <div onClick={() => this.showInfoModal(alert)}>
          <Alert closable type="info" title="Inspection Info" icon="fa-info">
            Most components will show their jsx code when you click on them! -
            Try me
          </Alert>
        </div>
        <Row onClick={() => this.showInfoModal(upperInfoBoxesString)}>
          <UpperInfoBoxes />
        </Row>
        <Row>
          <Col md={12}>
            <Box
              title="Monthly Recap Report"
              collapsable
              closable
              options={<ul />}
              footer={
                <Row>
                  <Col
                    sm={3}
                    xs={6}
                    onClick={() => this.showInfoModal(descriptionBlock1)}
                  >
                    <DescriptionBlock
                      percentage={17}
                      percentageColor="green"
                      header="$35,210.43"
                      text="TOTAL REVENUE"
                      indication="up"
                    />
                  </Col>
                  <Col
                    sm={3}
                    xs={6}
                    onClick={() => this.showInfoModal(descriptionBlock2)}
                  >
                    <DescriptionBlock
                      percentage={0}
                      percentageColor="yellow"
                      header="$10,390.90"
                      text="TOTAL COST"
                      indication="left"
                    />
                  </Col>
                  <Col
                    sm={3}
                    xs={6}
                    onClick={() => this.showInfoModal(descriptionBlock3)}
                  >
                    <DescriptionBlock
                      percentage={20}
                      percentageColor="green"
                      header="$24,813.53"
                      text="TOTAL PROFIT"
                      indication="up"
                    />
                  </Col>
                  <Col
                    sm={3}
                    xs={6}
                    onClick={() => this.showInfoModal(descriptionBlock4)}
                  >
                    <DescriptionBlock
                      percentage={18}
                      percentageColor="red"
                      header="1200"
                      text="GOAL COMPLETIONS"
                      indication="down"
                    />
                  </Col>
                </Row>
              }
            >
              <Row>
                <Col
                  md={8}
                  onClick={() => this.showInfoModal(monthlyRecapString)}
                >
                  <p className="text-center">
                    <strong>Sales: 1 Jan, 2014 - 30 Jul, 2014</strong>
                  </p>
                  <div className="chart" style={{ height: '180px' }}>
                    {/* <MonthlyRecapChart /> */}
                  </div>
                </Col>
                <Col md={4}>
                  <p className="text-center">
                    <strong>Goal Completion</strong>
                  </p>
                  <div onClick={() => this.showInfoModal(progressGroup1)}>
                    <ProgressGroup
                      text="Add Products to Cart"
                      maxValue={200}
                      currentValue={160}
                      color="aqua"
                    />
                  </div>
                  <div onClick={() => this.showInfoModal(progressGroup2)}>
                    <ProgressGroup
                      text="Complete Purchase"
                      maxValue={400}
                      currentValue={310}
                      color="red"
                    />
                  </div>
                  <div onClick={() => this.showInfoModal(progressGroup3)}>
                    <ProgressGroup
                      text="Visit Premium Page"
                      maxValue={800}
                      currentValue={480}
                      color="green"
                    />
                  </div>
                  <div onClick={() => this.showInfoModal(progressGroup4)}>
                    <ProgressGroup
                      text="Send Inquiries"
                      maxValue={500}
                      currentValue={250}
                      color="yellow"
                    />
                  </div>
                </Col>
              </Row>
            </Box>
          </Col>
        </Row>
      </Content>
    );
  }
}

export default Dashboard;
