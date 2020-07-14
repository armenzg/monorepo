import { hot } from 'react-hot-loader';
import React from 'react';
import './App.css';
import { Queue } from 'taskcluster-client-web';
import { inflate } from 'pako';

const rootUrl = 'https://firefox-ci-tc.services.mozilla.com';

class App extends React.PureComponent {
  state = {
    taskId: null,
    testPathsForTask: {},
  };

  async componentDidMount() {
    const testPathsForTask = {};
    const queue = new Queue({ rootUrl });
    const taskId = 'X-am8WpcT4yWn6Tnrt8HUQ';
    const task = await queue.task(taskId);
    const groupId = task.taskGroupId;
    if (taskId !== groupId) {
      const groupTask = await queue.task(groupId);
      const url = queue.buildUrl(
        queue.getArtifact,
        groupId,
        groupTask.retries,
        'public/tests-by-manifest.json.gz',
      );
      const finalUrl = await fetch(url);
      const response = await fetch(finalUrl.url);
      if ([200, 303, 304].includes(response.status)) {
        const blob = await response.blob();
        const binData = await blob.arrayBuffer();
        const decompressed = await inflate(binData, { to: 'string' });
        const testsByManifest = await JSON.parse(decompressed);
        if (task.payload.env.MOZHARNESS_TEST_PATHS) {
          const manifests = Object.values(JSON.parse(task.payload.env.MOZHARNESS_TEST_PATHS));
          manifests[0].forEach((manifest) => {
            testPathsForTask[manifest] = testsByManifest[manifest];
          });
          this.setState({ taskId, testPathsForTask });
        }
      }
    }
  }

  render() {
    const { taskId, testPathsForTask } = this.state;
    const url = `${rootUrl}/tasks/${taskId}`;

    return (
      <div className="App">
        <span>
          If MOZHARNESS_TEST_PATH and tests-by-manifest.json.gz are available we can
          calculate the list of manifests and test paths.
        </span>
        <a href={url}>{taskId}</a>
        {testPathsForTask && Object.keys(testPathsForTask).map((manifest) => (
          <div>
            <ul>
              <li>{manifest}</li>
              <ul>
                {testPathsForTask[manifest].map((testPath) => (<li>{testPath}</li>))}
              </ul>
            </ul>
          </div>
        ))}
      </div>
    );
  }
}

export default hot(module)(App);
