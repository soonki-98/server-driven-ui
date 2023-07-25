import React from "react";
import { useNavigate } from "react-router-dom";

type eventType = Record<
  string,
  {
    actionType: string;
    [action: string]: string;
  }
>;

export interface Element {
  type: string;
  props: Record<string, any>;
  events?: eventType;
  children?: Element[];
}

interface EventHandlers {
  [eventName: string]: (...args: any[]) => void;
}

interface ComponentsMap {
  [componentName: string]: React.ElementType;
}

function useEventHandlers(events: eventType): EventHandlers {
  const navigation = useNavigate();

  return Object.entries({ ...events } || {}).reduce((handlers, current) => {
    const [event, { actionType, ...action }] = current;
    switch (actionType) {
      case "route": {
        handlers[event] = (...args: any[]) => {
          navigation(action.route);
          console.log(`Event ${event} triggered for endpoint ${action.route}`, args);
        };
        break;
      }
    }
    return handlers;
  }, {} as EventHandlers);
}

function getComponentType(type: string, componentsMap: ComponentsMap): React.ElementType {
  try {
    return componentsMap[type];
  } catch (err) {
    throw new Error(`Component of type ${type} is not defined`);
  }
}

export default function DynamicElement({ element, componentsMap }: { element: Element; componentsMap: ComponentsMap }) {
  const { type, props, events, children } = element;

  const componentType = getComponentType(type, componentsMap);
  const eventHandlers = useEventHandlers(events || {});
  // 재귀적으로 자식 컴포넌트들을 생성합니다.
  const childComponents = (children || []).map((child, index) => (
    <DynamicElement key={index} element={child} componentsMap={componentsMap} />
  ));

  return React.createElement(componentType, { ...props, ...eventHandlers }, childComponents);
}
