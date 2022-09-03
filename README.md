# BP Deploy - v1.0.0

BP Deploy is a simple Wordpress plugin to trigger bitbucket pipelines. This plugin enables you to trigger a pipeline, view trigger history and configure the target repository, workspace and branch for your pipeline trigger.

## Getting started

1. Enable pipelines in you Bitbucket repository!
2. Create a pipeline that that triggers on a commit to a branch. Bellow is an example.

```yml
pipelines:
  branches:
    master:
      - step:
          script:
            - echo "This script runs only on commit to the main branch."
```

3. Create an app password. Navigate to your Bitbucket "Personal settings" and then to the "App passwords" tab. You will need this password later so keep note of it.
4. Clone the repository into your Wordpress plugin directory.
5. In your wp-config file define a variable like so `define('BP_APP_PASSWORD', 'THE_VALUE');`.
6. Activate the plugin, and navigate to its settings tab. Fill in the fields.
7. You are ready to trigger deployments.

## Notes

- Uninstalling the plugin will delete the deployment history.
- This plugin only supports pipelines that trigger on commits to a branch.
