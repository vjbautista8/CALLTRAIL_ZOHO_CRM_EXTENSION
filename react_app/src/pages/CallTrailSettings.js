import React from 'react';
import CallTrailSettingsHeader from './CallTrailSettingsHeader';
import Card from '../components/Card';
import CallTrailLeftPartHeaderSettings from './reports/CallTrailLeftPartHeaderSettings';
import CallFormSettings from './forms/CallFormSettings';
import TaskFormSettings from './forms/TaskFormSettings';
import CallTrailRightPartHeaderSettings from './reports/CallTrailRightPartHeaderSettings';
import SettingsPageContent from './settings/SettingsPageContent';
const CallTrailSettings = () => {
  return (
    <>
      <CallTrailSettingsHeader />
      <SettingsPageContent />
      {/* <div className='widget_data settings-content-main '>
        <Card
          data={{
            title: <CallTrailLeftPartHeaderSettings />,
            content: <CallFormSettings />,
            className: 'zcrmCard bom-card mr-0_5',
          }}
        />
        <Card
          data={{
            title: <CallTrailRightPartHeaderSettings />,
            content: <TaskFormSettings />,
            className: 'zcrmCard bom-card ml-0_5',
          }}
        />
      </div> */}
    </>
  );
};

export default CallTrailSettings;
