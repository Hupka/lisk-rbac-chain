import type { ActionsDefinition, BaseChannel, EventsDefinition, SchemaWithDefault } from 'lisk-sdk';
import { BasePlugin, PluginInfo } from 'lisk-sdk';

// interface RbacUIPluginOptions extends PluginOptionsWithAppConfig {
// 	applicationUrl: string;
// 	port: number;
// 	host: string;
// }

export class LiskRbacUIPlugin extends BasePlugin {
	// private _channel!: BaseChannel;

	public static get alias(): string {
		return 'LiskRbacUI';
	}

	public static get info(): PluginInfo {
		return {
			author: 'hupka.adrian@gmail.com',
			version: '0.1.0',
			name: 'LiskRbacUI',
		};
	}

	public get defaults(): SchemaWithDefault {
		return {
			$id: '/plugins/plugin-LiskRbacUI/config',
			type: 'object',
			properties: {
				applicationUrl: {
					type: 'string',
					format: 'uri',
					description: 'URL to connect',
				},
				port: {
					type: 'integer',
					minimum: 1,
					maximum: 65535,
				},
				host: {
					type: 'string',
					format: 'ip',
				},
			},
			required: [],
			default: {
				applicationUrl: 'ws://localhost:8080/ws',
				port: 4005,
				host: '127.0.0.1',
			},
		}
	}

	public get events(): EventsDefinition {
		return [
			// 'block:created',
			// 'block:missed'
		];
	}

	public get actions(): ActionsDefinition {
		return {
			// 	hello: async () => { hello: 'world' },
		};
	}

	public async load(_: BaseChannel): Promise<void> {
		// this._channel = channel;
		// this._channel.once('app:ready', () => {});
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	public async unload(): Promise<void> { }
}
