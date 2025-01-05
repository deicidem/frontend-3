import { ReactNode } from 'react';
import { UrlObject } from 'url';

export type THeaderLinks = {
	link: UrlObject | __next_route_internal_types__.RouteImpl<string>;
	icon: ReactNode | JSX.Element;
};
