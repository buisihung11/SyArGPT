"use client"

import { Edit2, File } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { DrawIoEmbed, DrawIoEmbedRef, EventExport } from "react-drawio"
import { GridBackgroundDemo } from "../GridBackground/GridBackground"
import HistorySection from "../HistorySection/HistorySection"
import { AspectRatio } from "../ui/aspect-ratio"
import { Button } from "../ui/button"
import { useBoundStore } from "@/stores/useBoundStore"

const sampleXMLDiagram = `
<mxfile modified="2024-05-02T14:17:57.052Z" host="app.diagrams.net" agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36" etag="u8erhl7UundKnxo3WJF2" version="24.3.1" type="google">
  <diagram id="Ht1M8jgEwFfnCIfOTk4-" name="Page-1">
    <mxGraphModel dx="970" dy="675" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        <mxCell id="UEzPUAAOIrF-is8g5C7q-107" value="" style="rounded=0;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=none;dashed=1;container=1;pointerEvents=0;collapsible=0;recursiveResize=0;" parent="1" vertex="1">
          <mxGeometry x="340" y="290" width="480" height="430" as="geometry" />
        </mxCell>
        <mxCell id="UEzPUAAOIrF-is8g5C7q-74" value="AWS Cloud" style="points=[[0,0],[0.25,0],[0.5,0],[0.75,0],[1,0],[1,0.25],[1,0.5],[1,0.75],[1,1],[0.75,1],[0.5,1],[0.25,1],[0,1],[0,0.75],[0,0.5],[0,0.25]];outlineConnect=0;gradientColor=none;html=1;whiteSpace=wrap;fontSize=12;fontStyle=0;shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_aws_cloud_alt;strokeColor=#232F3E;fillColor=none;verticalAlign=top;align=left;spacingLeft=30;fontColor=#232F3E;dashed=0;labelBackgroundColor=#ffffff;container=1;pointerEvents=0;collapsible=0;recursiveResize=0;" parent="1" vertex="1">
          <mxGeometry x="50" y="80" width="780" height="650" as="geometry" />
        </mxCell>
        <mxCell id="UEzPUAAOIrF-is8g5C7q-75" value="AWS Cloud" style="points=[[0,0],[0.25,0],[0.5,0],[0.75,0],[1,0],[1,0.25],[1,0.5],[1,0.75],[1,1],[0.75,1],[0.5,1],[0.25,1],[0,1],[0,0.75],[0,0.5],[0,0.25]];outlineConnect=0;gradientColor=none;html=1;whiteSpace=wrap;fontSize=12;fontStyle=0;shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_aws_cloud_alt;strokeColor=#232F3E;fillColor=none;verticalAlign=top;align=left;spacingLeft=30;fontColor=#232F3E;dashed=0;labelBackgroundColor=#ffffff;container=1;pointerEvents=0;collapsible=0;recursiveResize=0;" parent="1" vertex="1">
          <mxGeometry x="850" y="80" width="270" height="650" as="geometry" />
        </mxCell>
        <mxCell id="UEzPUAAOIrF-is8g5C7q-88" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=open;endFill=0;strokeWidth=2;" parent="1" source="UEzPUAAOIrF-is8g5C7q-76" target="UEzPUAAOIrF-is8g5C7q-77" edge="1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="UEzPUAAOIrF-is8g5C7q-89" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=open;endFill=0;strokeWidth=2;" parent="1" source="UEzPUAAOIrF-is8g5C7q-77" target="UEzPUAAOIrF-is8g5C7q-79" edge="1">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="248" y="350" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="UEzPUAAOIrF-is8g5C7q-106" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=open;endFill=0;strokeWidth=2;" parent="1" source="UEzPUAAOIrF-is8g5C7q-77" target="UEzPUAAOIrF-is8g5C7q-78" edge="1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="UEzPUAAOIrF-is8g5C7q-104" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=open;endFill=0;strokeWidth=2;" parent="1" source="UEzPUAAOIrF-is8g5C7q-78" target="UEzPUAAOIrF-is8g5C7q-84" edge="1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="UEzPUAAOIrF-is8g5C7q-90" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=open;endFill=0;strokeWidth=2;" parent="1" source="UEzPUAAOIrF-is8g5C7q-79" target="UEzPUAAOIrF-is8g5C7q-80" edge="1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="UEzPUAAOIrF-is8g5C7q-91" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=open;endFill=0;strokeWidth=2;" parent="1" source="UEzPUAAOIrF-is8g5C7q-80" target="UEzPUAAOIrF-is8g5C7q-81" edge="1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="UEzPUAAOIrF-is8g5C7q-92" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=open;endFill=0;strokeWidth=2;" parent="1" source="UEzPUAAOIrF-is8g5C7q-81" target="UEzPUAAOIrF-is8g5C7q-82" edge="1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="UEzPUAAOIrF-is8g5C7q-93" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=open;endFill=0;strokeWidth=2;" parent="1" source="UEzPUAAOIrF-is8g5C7q-82" target="UEzPUAAOIrF-is8g5C7q-85" edge="1">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="762" y="480" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="UEzPUAAOIrF-is8g5C7q-105" value="Monitor template" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=open;endFill=0;strokeWidth=2;" parent="1" source="UEzPUAAOIrF-is8g5C7q-83" target="UEzPUAAOIrF-is8g5C7q-80" edge="1">
          <mxGeometry x="0.1208" y="-10" relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="919" y="270" />
              <mxPoint x="519" y="270" />
            </Array>
            <mxPoint as="offset" />
          </mxGeometry>
        </mxCell>
        <mxCell id="UEzPUAAOIrF-is8g5C7q-101" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=open;endFill=0;strokeWidth=2;" parent="1" source="UEzPUAAOIrF-is8g5C7q-84" target="UEzPUAAOIrF-is8g5C7q-83" edge="1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="UEzPUAAOIrF-is8g5C7q-96" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=open;endFill=0;strokeWidth=2;startArrow=open;startFill=0;" parent="1" source="UEzPUAAOIrF-is8g5C7q-85" target="UEzPUAAOIrF-is8g5C7q-86" edge="1">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="638" y="560" />
              <mxPoint x="528" y="560" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="UEzPUAAOIrF-is8g5C7q-97" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=open;endFill=0;strokeWidth=2;startArrow=open;startFill=0;" parent="1" source="UEzPUAAOIrF-is8g5C7q-85" target="UEzPUAAOIrF-is8g5C7q-87" edge="1">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="684" y="560" />
              <mxPoint x="859" y="560" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="UEzPUAAOIrF-is8g5C7q-100" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=open;endFill=0;strokeWidth=2;" parent="1" source="UEzPUAAOIrF-is8g5C7q-86" target="UEzPUAAOIrF-is8g5C7q-98" edge="1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="UEzPUAAOIrF-is8g5C7q-76" value="Object" style="outlineConnect=0;fontColor=#232F3E;gradientColor=none;fillColor=#277116;strokeColor=none;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;pointerEvents=1;shape=mxgraph.aws4.object;labelBackgroundColor=#ffffff;" parent="1" vertex="1">
          <mxGeometry x="90" y="140" width="78" height="78" as="geometry" />
        </mxCell>
        <mxCell id="UEzPUAAOIrF-is8g5C7q-77" value="Bucket" style="outlineConnect=0;fontColor=#232F3E;gradientColor=none;fillColor=#277116;strokeColor=none;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;pointerEvents=1;shape=mxgraph.aws4.bucket_with_objects;labelBackgroundColor=#ffffff;" parent="1" vertex="1">
          <mxGeometry x="210" y="140" width="75" height="78" as="geometry" />
        </mxCell>
        <mxCell id="UEzPUAAOIrF-is8g5C7q-78" value="Bucket" style="outlineConnect=0;fontColor=#232F3E;gradientColor=none;fillColor=#277116;strokeColor=none;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;pointerEvents=1;shape=mxgraph.aws4.bucket_with_objects;labelBackgroundColor=#ffffff;" parent="1" vertex="1">
          <mxGeometry x="1020" y="140" width="75" height="78" as="geometry" />
        </mxCell>
        <mxCell id="UEzPUAAOIrF-is8g5C7q-79" value="AWS&lt;br&gt;CloudTrail" style="outlineConnect=0;fontColor=#232F3E;gradientColor=#F34482;gradientDirection=north;fillColor=#BC1356;strokeColor=#ffffff;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.cloudtrail;labelBackgroundColor=#ffffff;" parent="1" vertex="1">
          <mxGeometry x="370" y="310" width="78" height="78" as="geometry" />
        </mxCell>
        <mxCell id="UEzPUAAOIrF-is8g5C7q-80" value="Amazon&lt;br&gt;CloudWatch" style="outlineConnect=0;fontColor=#232F3E;gradientColor=#F34482;gradientDirection=north;fillColor=#BC1356;strokeColor=#ffffff;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.cloudwatch;labelBackgroundColor=#ffffff;" parent="1" vertex="1">
          <mxGeometry x="480" y="310" width="78" height="78" as="geometry" />
        </mxCell>
        <mxCell id="UEzPUAAOIrF-is8g5C7q-81" value="Amazon Simple&lt;br&gt;Notification Service&lt;br&gt;" style="outlineConnect=0;fontColor=#232F3E;gradientColor=#F34482;gradientDirection=north;fillColor=#BC1356;strokeColor=#ffffff;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.sns;labelBackgroundColor=#ffffff;" parent="1" vertex="1">
          <mxGeometry x="600" y="310" width="78" height="78" as="geometry" />
        </mxCell>
        <mxCell id="UEzPUAAOIrF-is8g5C7q-82" value="Amazon Simple&lt;br&gt;Queue Service&lt;br&gt;" style="outlineConnect=0;fontColor=#232F3E;gradientColor=#F34482;gradientDirection=north;fillColor=#BC1356;strokeColor=#ffffff;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.sqs;labelBackgroundColor=#ffffff;" parent="1" vertex="1">
          <mxGeometry x="723" y="310" width="78" height="78" as="geometry" />
        </mxCell>
        <mxCell id="UEzPUAAOIrF-is8g5C7q-83" value="Amazon&lt;br&gt;CloudWatch&lt;br&gt;" style="outlineConnect=0;fontColor=#232F3E;gradientColor=#F34482;gradientDirection=north;fillColor=#BC1356;strokeColor=#ffffff;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.cloudwatch;labelBackgroundColor=#ffffff;" parent="1" vertex="1">
          <mxGeometry x="880" y="310" width="78" height="78" as="geometry" />
        </mxCell>
        <mxCell id="UEzPUAAOIrF-is8g5C7q-84" value="AWS&lt;br&gt;CloudTrail" style="outlineConnect=0;fontColor=#232F3E;gradientColor=#F34482;gradientDirection=north;fillColor=#BC1356;strokeColor=#ffffff;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.cloudtrail;labelBackgroundColor=#ffffff;" parent="1" vertex="1">
          <mxGeometry x="1018.5" y="310" width="78" height="78" as="geometry" />
        </mxCell>
        <mxCell id="UEzPUAAOIrF-is8g5C7q-85" value="AWS Lambda" style="outlineConnect=0;fontColor=#232F3E;gradientColor=#F78E04;gradientDirection=north;fillColor=#D05C17;strokeColor=#ffffff;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.lambda;labelBackgroundColor=#ffffff;spacingTop=6;" parent="1" vertex="1">
          <mxGeometry x="599" y="450" width="78" height="78" as="geometry" />
        </mxCell>
        <mxCell id="UEzPUAAOIrF-is8g5C7q-86" value="Amazon Kinesis&lt;br&gt;Data&amp;nbsp;Firehose" style="outlineConnect=0;fontColor=#232F3E;gradientColor=#945DF2;gradientDirection=north;fillColor=#5A30B5;strokeColor=#ffffff;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.kinesis_data_firehose;labelBackgroundColor=#ffffff;" parent="1" vertex="1">
          <mxGeometry x="489" y="590" width="78" height="78" as="geometry" />
        </mxCell>
        <mxCell id="UEzPUAAOIrF-is8g5C7q-87" value="Amazon&lt;br&gt;DynamoDB" style="outlineConnect=0;fontColor=#232F3E;gradientColor=#4D72F3;gradientDirection=north;fillColor=#3334B9;strokeColor=#ffffff;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.dynamodb;labelBackgroundColor=#ffffff;" parent="1" vertex="1">
          <mxGeometry x="710" y="590" width="78" height="78" as="geometry" />
        </mxCell>
        <mxCell id="UEzPUAAOIrF-is8g5C7q-98" value="Bucket" style="outlineConnect=0;fontColor=#232F3E;gradientColor=none;fillColor=#277116;strokeColor=none;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;pointerEvents=1;shape=mxgraph.aws4.bucket;labelBackgroundColor=#ffffff;" parent="1" vertex="1">
          <mxGeometry x="120" y="590" width="75" height="78" as="geometry" />
        </mxCell>
        <mxCell id="UEzPUAAOIrF-is8g5C7q-108" value="" style="rounded=0;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=none;dashed=1;container=1;pointerEvents=0;collapsible=0;recursiveResize=0;" parent="1" vertex="1">
          <mxGeometry x="860" y="290" width="250" height="430" as="geometry" />
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
`

const ResultSection = () => {
  const currentMessage = useBoundStore(state => state.currentMessage)
  const isInit = !currentMessage

  const [viewMode, setViewMode] = useState<"image" | "edit">("image")
  const [isLoaded, setIsLoaded] = useState(false)
  const [fetchingXMLFile, setFetchingXMLFile] = useState(false)
  const drawioRef = useRef<DrawIoEmbedRef>(null)
  const downloadRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    if (drawioRef.current && isLoaded) {
      drawioRef.current.layout({
        layouts: []
      })
    }
  }, [isLoaded])

  const onExportFile = (data: EventExport) => {
    const link = downloadRef.current
    if (!link) {
      return
    }

    link.href = data.data
    link.download = `image_${new Date().toUTCString()}.${data.format}`
    ;(link as any).click()
  }

  return (
    <div className="relative flex h-full min-h-[50vh] flex-col">
      <a ref={downloadRef} className="hidden" />
      <GridBackgroundDemo />
      {isInit ? (
        <div className="h-full p-6 text-center flex flex-col gap-2 w-full justify-center">
          <div className="flex gap-2 items-center justify-center">
            <Image
              width={40}
              height={40}
              src="/assets/images/wave_hand.webp"
              alt="Online collaboration"
              unoptimized
            />
            <h1 className="text-4xl font-semibold mt-1">Welcome to SyArGPT!</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Start by creating a new diagram or loading an existing one to begin
            collaborating.
          </p>
        </div>
      ) : (
        <>
          <div
            className={`p-4 flex flex-col gap-2 items-center h-full justify-center ${
              viewMode !== "image" && "hidden"
            }`}
          >
            <AspectRatio ratio={16 / 9} className="bg-muted shadow-md">
              <Image
                src="/assets/images/sample_diagram.png"
                alt="Photo by Drew Beamer"
                fill
                className="rounded-md object-cover cursor-pointer"
              />
            </AspectRatio>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setViewMode("edit")
                }}
                variant="outline"
                size="sm"
              >
                <Edit2 className="mr-2 h-4 w-4" />
                Edit mode
              </Button>
              <Button
                onClick={() => {
                  drawioRef.current?.exportDiagram({
                    format: "png"
                  })
                }}
                variant="outline"
                size="sm"
              >
                <File className="mr-2 h-4 w-4" /> Export
              </Button>
            </div>
          </div>

          <div className={`${viewMode !== "edit" && "hidden"} h-full`}>
            <DrawIoEmbed
              ref={drawioRef}
              xml={sampleXMLDiagram}
              onLoad={() => {
                setIsLoaded(true)
              }}
              onExport={onExportFile}
            />
          </div>
        </>
      )}
      <div className="flex-1" />
      <HistorySection />
    </div>
  )
}

export default ResultSection
