<?xml version="1.0" encoding="utf-8"?>

<!DOCTYPE xsl:stylesheet [
<!ENTITY % blocks.ent SYSTEM "../blocks.ent"> %blocks.ent;
<!ENTITY % images.ent SYSTEM "../images.ent"> %images.ent;
]>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:include href="../some/template.xsl"/>

<!-- Some comment -->
<xsl:template name="opera"/>

<xsl:template match="order">
    <xsl:choose>
        <xsl:when test="loli">
            <xsl:apply-templates select="pop" mode="lolipop"/>
        </xsl:when>
        <xsl:when test="loli-poli">
            <xsl:text>some</xsl:text>
        </xsl:when>
        <xsl:otherwise>
            <xsl:text>none</xsl:text>
        </xsl:otherwise>
    </xsl:choose>
    <xsl:text>Text</xsl:text>
    <div>
        <xsl:attribute name="class">
            <xsl:text>someClass</xsl:text>
        </xsl:attribute>
    </div>
</xsl:template>

<xsl:template match="order" mode="url-content">
    <xsl:apply-templates select="ask" mode="order"></xsl:apply-templates>
    <xsl:if test="loli-pop">
        <xsl:text>Another Text</xsl:text>
    </xsl:if>
</xsl:template>

</xsl:stylesheet>
