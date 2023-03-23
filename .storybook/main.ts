import type { StorybookConfig } from "@storybook/react-webpack5";
import { VanillaExtractPlugin } from '@vanilla-extract/webpack-plugin';

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/preset-scss",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: (webpackConfig) => {
    if (webpackConfig?.module?.rules) {
      // This modifies the existing image rule to exclude `.svg` files
      // since we handle those with `@svgr/webpack`.
      const imageRule = webpackConfig.module.rules.find((rule) => {
        if (typeof rule !== 'string' && rule.test instanceof RegExp) {
          return rule.test.test('.svg')
        }
      })

      if (imageRule && typeof imageRule !== 'string') {
        imageRule.exclude = /\.svg$/
      }

      webpackConfig.plugins?.push(new VanillaExtractPlugin())
      webpackConfig.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      })
    }

    return webpackConfig;
  }
};
export default config;
