<?xml version="1.0" encoding="utf-8"?>

<!DOCTYPE xsl:stylesheet [
    <!ENTITY % blocks.ent SYSTEM "../blocks.ent"> %blocks.ent;
    <!ENTITY % images.ent SYSTEM "../images.ent"> %images.ent;
]>

<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    >

<!-- ############################################################################################################## -->

<xsl:template match="_404" mode="block-content">
<div class="b-404">
    <div class="b-404__title">%i18n_Error_Несуществующая_страница;</div>
    <div class="b-404__p">%i18n_Error_Страница_не_существует;</div>
    <div class="b-404__p">%i18n_Error_Проверьте_адрес;</div>
    <div class="b-404__p">
        <a class="b-404__action daria-action" href="#" data-action="common.back">%i18n_Вернуться;</a>
        <xsl:text> · </xsl:text>
        <a class="b-404__action" href="#compose">%i18n_Message_Написать_письмо;</a>
        <xsl:text> · </xsl:text>
        <a class="b-404__action" href="#inbox">%i18n_Error_Перейти_во_входящие;</a>
    </div>
    <div class="b-404__teasers">
        <div class="b-404__teaser">
            %i18n_Error_Рекомендуем_настроить_почту;
        </div>
        <xsl:if test="$locale = 'ru'">
            <div class="b-404__teaser">
                %i18n_Error_Узнать_о_функциях;
                <a class="b-404__action" href="/menu/" target="_blank">
                    <img class="b-mail-icon b-mail-icon_to-menu" alt="" src="&b-mail-icon_to-menu.png;"/>
                </a>
            </div>
        </xsl:if>
    </div>
</div>
</xsl:template>

</xsl:stylesheet>
