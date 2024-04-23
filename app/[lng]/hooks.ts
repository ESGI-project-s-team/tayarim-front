import {useContext} from "react";
import {
    NavbarContext,
    TranslationContext,
    IsOpenContext,
    NotificationContext,
    LoaderContext,
    IsOpenSideBarContext
} from "./contexts";

export function useNavbarContext() {
    return useContext(NavbarContext);
}

export function useTranslationContext() {
    return useContext(TranslationContext);
}

export function useIsOpenContext() {
    return useContext(IsOpenContext);
}

export function useNotificationContext() {
    return useContext(NotificationContext);
}

export function useLoaderContext() {
    return useContext(LoaderContext);
}

export function useIsOpenSideBarContext() {
    return useContext(IsOpenSideBarContext);
}